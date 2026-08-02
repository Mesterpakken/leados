import { useMemo, useState } from 'react';
import { DEMO_SELLER, computeTotals, submitSalesOrder } from '../lib/salesOrders';
import { money } from '../lib/commission';

const emptyLine = () => ({
  id: `l-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  product: '',
  sku: '',
  qty: '1',
  lineTotal: '',
});

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function RegistrerSalg({ notify, onCancel, onSubmitted }) {
  const [step, setStep] = useState('form'); // form | preview | done
  const [submittedId, setSubmittedId] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showBonus, setShowBonus] = useState(false);

  const [customer, setCustomer] = useState({
    company: '',
    cvr: '',
    contact: '',
    phone: '',
    email: '',
    billingAddress: '',
    zip: '',
    city: '',
    sameDelivery: true,
    deliveryAddress: '',
    deliveryZip: '',
    deliveryCity: '',
    salesType: 'Nysalg',
  });

  const [lines, setLines] = useState([emptyLine()]);
  const [bonus, setBonus] = useState({ product: '', qty: '1', internalValue: '', note: '' });
  const [delivery, setDelivery] = useState({
    desiredDate: '',
    driverNote: '',
    internalNotes: '',
  });

  const totals = useMemo(() => computeTotals(lines), [lines]);

  const setC = (key, value) => setCustomer((prev) => ({ ...prev, [key]: value }));
  const setD = (key, value) => setDelivery((prev) => ({ ...prev, [key]: value }));

  const updateLine = (id, key, value) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, [key]: value } : l)));
  };

  const validate = () => {
    const e = {};
    if (!customer.company.trim()) e.company = 'Firmanavn er påkrævet.';
    if (!/^\d{8}$/.test(customer.cvr.trim())) e.cvr = 'CVR skal være præcis 8 cifre.';
    if (!customer.contact.trim()) e.contact = 'Kontaktperson er påkrævet.';
    if (!customer.phone.trim()) e.phone = 'Telefonnummer er påkrævet.';
    if (!customer.email.trim()) e.email = 'E-mail er påkrævet.';
    else if (!isEmail(customer.email.trim())) e.email = 'Angiv en gyldig e-mailadresse.';
    if (!customer.billingAddress.trim()) e.billingAddress = 'Faktureringsadresse er påkrævet.';
    if (!/^\d{4}$/.test(customer.zip.trim())) e.zip = 'Postnummer skal være 4 cifre.';
    if (!customer.city.trim()) e.city = 'By er påkrævet.';
    if (!customer.salesType) e.salesType = 'Vælg salgstype.';

    if (!customer.sameDelivery) {
      if (!customer.deliveryAddress.trim()) e.deliveryAddress = 'Leveringsadresse er påkrævet.';
      if (!/^\d{4}$/.test(customer.deliveryZip.trim())) e.deliveryZip = 'Postnummer skal være 4 cifre.';
      if (!customer.deliveryCity.trim()) e.deliveryCity = 'By er påkrævet.';
    }

    if (!lines.length) e.lines = 'Tilføj mindst én ordrelinje.';
    lines.forEach((l, i) => {
      if (!l.product.trim()) e[`line-${l.id}-product`] = `Linje ${i + 1}: produktnavn mangler.`;
      const qty = Number(l.qty);
      if (!Number.isFinite(qty) || qty <= 0) e[`line-${l.id}-qty`] = `Linje ${i + 1}: antal skal være større end 0.`;
      const price = Number(l.lineTotal);
      if (l.lineTotal === '' || l.lineTotal == null) {
        e[`line-${l.id}-price`] = `Linje ${i + 1}: samlet pris mangler.`;
      } else if (!Number.isFinite(price) || price <= 0) {
        e[`line-${l.id}-price`] = `Linje ${i + 1}: samlet pris skal være større end 0.`;
      }
    });

    if (totals.orderTotal <= 0) e.totals = 'Ordrebeløbet skal være større end 0.';

    setErrors(e);
    return e;
  };

  const fieldError = (key) => (touched[key] || step === 'preview' ? errors[key] : null);

  const goPreview = () => {
    const e = validate();
    setTouched(
      Object.fromEntries(
        [
          'company',
          'cvr',
          'contact',
          'phone',
          'email',
          'billingAddress',
          'zip',
          'city',
          'salesType',
          'deliveryAddress',
          'deliveryZip',
          'deliveryCity',
          ...lines.flatMap((l) => [
            `line-${l.id}-product`,
            `line-${l.id}-qty`,
            `line-${l.id}-price`,
          ]),
        ].map((k) => [k, true]),
      ),
    );
    if (Object.keys(e).length) {
      notify('Ret felterne med fejl, før du fortsætter');
      return;
    }
    setStep('preview');
  };

  const send = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setStep('form');
      notify('Ordren er ikke gyldig endnu');
      return;
    }
    const order = submitSalesOrder({
      seller: DEMO_SELLER,
      customer: {
        ...customer,
        deliveryAddress: customer.sameDelivery ? customer.billingAddress : customer.deliveryAddress,
        deliveryZip: customer.sameDelivery ? customer.zip : customer.deliveryZip,
        deliveryCity: customer.sameDelivery ? customer.city : customer.deliveryCity,
      },
      lines,
      bonus: showBonus ? bonus : { product: '', qty: '1', internalValue: '', note: '' },
      delivery,
    });
    setSubmittedId(order.id);
    setStep('done');
    notify(`${order.id} sendt til godkendelse`);
    onSubmitted?.(order);
  };

  const resetForm = () => {
    setStep('form');
    setSubmittedId(null);
    setShowBonus(false);
    setCustomer({
      company: '',
      cvr: '',
      contact: '',
      phone: '',
      email: '',
      billingAddress: '',
      zip: '',
      city: '',
      sameDelivery: true,
      deliveryAddress: '',
      deliveryZip: '',
      deliveryCity: '',
      salesType: 'Nysalg',
    });
    setLines([emptyLine()]);
    setBonus({ product: '', qty: '1', internalValue: '', note: '' });
    setDelivery({ desiredDate: '', driverNote: '', internalNotes: '' });
    setErrors({});
    setTouched({});
  };

  if (step === 'done') {
    return (
      <div className="content reg-sale">
        <div className="card reg-done">
          <span className="kicker">BEKRÆFTELSE</span>
          <h2>Ordren er sendt til godkendelse</h2>
          <p>
            <b>{submittedId}</b> afventer Michael. Du kan følge status under Mine salg.
          </p>
          <div className="rule-actions">
            <button type="button" className="primary" onClick={() => onCancel?.('seller-sales')}>
              Gå til Mine salg
            </button>
            <button type="button" className="secondary" onClick={resetForm}>
              Registrér endnu et salg
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'preview') {
    const deliveryAddr = customer.sameDelivery
      ? `${customer.billingAddress}, ${customer.zip} ${customer.city}`
      : `${customer.deliveryAddress}, ${customer.deliveryZip} ${customer.deliveryCity}`;

    return (
      <div className="content reg-sale">
        <button type="button" className="back-button" onClick={() => setStep('form')}>
          ← Ret ordren
        </button>
        <div className="people-intro">
          <div>
            <h2>Tjek før du sender</h2>
            <p>Kontrollér oplysningerne. Ordren går til Michael til godkendelse.</p>
          </div>
        </div>

        <article className="card reg-preview">
          <div className="reg-preview-grid">
            <div>
              <span className="kicker">KUNDE</span>
              <b>{customer.company}</b>
              <p>
                CVR {customer.cvr} · {customer.salesType}
              </p>
              <p>
                {customer.contact} · {customer.phone} · {customer.email}
              </p>
              <p>{deliveryAddr}</p>
            </div>
            <div>
              <span className="kicker">LEVERING</span>
              <b>
                {delivery.desiredDate
                  ? `Særlig leveringsdato: ${delivery.desiredDate}`
                  : 'Hurtigst muligt'}
              </b>
              {delivery.driverNote && <p>Til lager/chauffør: {delivery.driverNote}</p>}
              {delivery.internalNotes && <p>Internt: {delivery.internalNotes}</p>}
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Varenr.</th>
                <th>Antal</th>
                <th>Samlet pris</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l) => (
                <tr key={l.id}>
                  <td>
                    <b>{l.product}</b>
                  </td>
                  <td>{l.sku || '—'}</td>
                  <td>{l.qty}</td>
                  <td>{money(Number(l.lineTotal) || 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {showBonus && bonus.product && (
            <div className="reg-bonus-note">
              <span className="kicker">BONUSVARE / GAVE</span>
              <p>
                {bonus.product} · {bonus.qty} stk.
                {bonus.internalValue ? ` · intern værdi ${money(Number(bonus.internalValue) || 0)}` : ''}
                {bonus.note ? ` · ${bonus.note}` : ''}
              </p>
              <small>Tæller ikke med i kundens ordrebeløb.</small>
            </div>
          )}

          <div className="reg-totals">
            <span className="reg-total-strong">
              Samlet ordrebeløb <b>{money(totals.orderTotal)}</b>
            </span>
          </div>

          <div className="rule-actions" style={{ marginTop: 18 }}>
            <button type="button" className="primary" onClick={send}>
              Send til godkendelse
            </button>
            <button type="button" className="secondary" onClick={() => setStep('form')}>
              Ret ordren
            </button>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="content reg-sale">
      <button type="button" className="back-button" onClick={() => onCancel?.()}>
        ← Annullér
      </button>
      <div className="people-intro">
        <div>
          <h2>Registrér salg</h2>
          <p>Hurtigere end en mail — LeadOS tjekker felterne, før ordren går til Michael.</p>
        </div>
        <span className="muted">Sælger: {DEMO_SELLER}</span>
      </div>

      {/* Section 1 */}
      <section className="card reg-section">
        <span className="kicker">1 · KUNDE</span>
        <div className="reg-grid-2">
          <label className={fieldError('company') ? 'has-error' : ''}>
            Firmanavn *
            <input
              value={customer.company}
              onChange={(e) => setC('company', e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, company: true }))}
              placeholder="Fx BygPartner A/S"
            />
            {fieldError('company') && <em>{fieldError('company')}</em>}
          </label>
          <label className={fieldError('cvr') ? 'has-error' : ''}>
            CVR-nummer *
            <input
              value={customer.cvr}
              onChange={(e) => setC('cvr', e.target.value.replace(/\D/g, '').slice(0, 8))}
              onBlur={() => setTouched((t) => ({ ...t, cvr: true }))}
              placeholder="12345678"
              inputMode="numeric"
            />
            {fieldError('cvr') && <em>{fieldError('cvr')}</em>}
          </label>
          <label className={fieldError('contact') ? 'has-error' : ''}>
            Kontaktperson *
            <input
              value={customer.contact}
              onChange={(e) => setC('contact', e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, contact: true }))}
            />
            {fieldError('contact') && <em>{fieldError('contact')}</em>}
          </label>
          <label className={fieldError('phone') ? 'has-error' : ''}>
            Telefonnummer *
            <input
              value={customer.phone}
              onChange={(e) => setC('phone', e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            />
            {fieldError('phone') && <em>{fieldError('phone')}</em>}
          </label>
          <label className={fieldError('email') ? 'has-error' : ''}>
            E-mail *
            <input
              value={customer.email}
              onChange={(e) => setC('email', e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              type="email"
            />
            {fieldError('email') && <em>{fieldError('email')}</em>}
          </label>
          <label>
            Sælger
            <input value={DEMO_SELLER} readOnly disabled />
          </label>
        </div>

        <div className="reg-grid-3">
          <label className={fieldError('billingAddress') ? 'has-error' : ''}>
            Faktureringsadresse *
            <input
              value={customer.billingAddress}
              onChange={(e) => setC('billingAddress', e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, billingAddress: true }))}
            />
            {fieldError('billingAddress') && <em>{fieldError('billingAddress')}</em>}
          </label>
          <label className={fieldError('zip') ? 'has-error' : ''}>
            Postnummer *
            <input
              value={customer.zip}
              onChange={(e) => setC('zip', e.target.value.replace(/\D/g, '').slice(0, 4))}
              onBlur={() => setTouched((t) => ({ ...t, zip: true }))}
              inputMode="numeric"
            />
            {fieldError('zip') && <em>{fieldError('zip')}</em>}
          </label>
          <label className={fieldError('city') ? 'has-error' : ''}>
            By *
            <input
              value={customer.city}
              onChange={(e) => setC('city', e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, city: true }))}
            />
            {fieldError('city') && <em>{fieldError('city')}</em>}
          </label>
        </div>

        <label className="reg-check">
          <input
            type="checkbox"
            checked={customer.sameDelivery}
            onChange={(e) => setC('sameDelivery', e.target.checked)}
          />
          Leveringsadressen er den samme
        </label>

        {!customer.sameDelivery && (
          <div className="reg-grid-3">
            <label className={fieldError('deliveryAddress') ? 'has-error' : ''}>
              Leveringsadresse *
              <input
                value={customer.deliveryAddress}
                onChange={(e) => setC('deliveryAddress', e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, deliveryAddress: true }))}
              />
              {fieldError('deliveryAddress') && <em>{fieldError('deliveryAddress')}</em>}
            </label>
            <label className={fieldError('deliveryZip') ? 'has-error' : ''}>
              Postnummer *
              <input
                value={customer.deliveryZip}
                onChange={(e) => setC('deliveryZip', e.target.value.replace(/\D/g, '').slice(0, 4))}
                onBlur={() => setTouched((t) => ({ ...t, deliveryZip: true }))}
              />
              {fieldError('deliveryZip') && <em>{fieldError('deliveryZip')}</em>}
            </label>
            <label className={fieldError('deliveryCity') ? 'has-error' : ''}>
              By *
              <input
                value={customer.deliveryCity}
                onChange={(e) => setC('deliveryCity', e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, deliveryCity: true }))}
              />
              {fieldError('deliveryCity') && <em>{fieldError('deliveryCity')}</em>}
            </label>
          </div>
        )}

        <div className="reg-sales-type">
          <span className="reg-sales-type-label">Salgstype *</span>
          <div className="reg-segment" role="group" aria-label="Salgstype">
            {['Nysalg', 'Gensalg'].map((type) => (
              <button
                key={type}
                type="button"
                className={customer.salesType === type ? 'active' : ''}
                onClick={() => {
                  setC('salesType', type);
                  setTouched((t) => ({ ...t, salesType: true }));
                }}
              >
                {type}
              </button>
            ))}
          </div>
          {fieldError('salesType') && <em className="reg-inline-error">{fieldError('salesType')}</em>}
        </div>
      </section>

      {/* Section 2 */}
      <section className="card reg-section">
        <div className="card-head">
          <span className="kicker">2 · ORDRE</span>
          <button type="button" className="secondary" onClick={() => setLines((prev) => [...prev, emptyLine()])}>
            + Tilføj linje
          </button>
        </div>

        {lines.map((l, i) => (
          <div className="reg-line" key={l.id}>
            <div className="reg-line-head">
              <b>Linje {i + 1}</b>
              {lines.length > 1 && (
                <button
                  type="button"
                  className="text-button"
                  onClick={() => setLines((prev) => prev.filter((x) => x.id !== l.id))}
                >
                  Fjern
                </button>
              )}
            </div>
            <div className="reg-grid-line-simple">
              <label className={fieldError(`line-${l.id}-product`) ? 'has-error' : ''}>
                Produkt / varenavn *
                <input
                  value={l.product}
                  onChange={(e) => updateLine(l.id, 'product', e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, [`line-${l.id}-product`]: true }))}
                  placeholder="Fx skæreskiver"
                />
                {fieldError(`line-${l.id}-product`) && <em>{fieldError(`line-${l.id}-product`)}</em>}
              </label>
              <label>
                Varenummer
                <input
                  value={l.sku}
                  onChange={(e) => updateLine(l.id, 'sku', e.target.value)}
                  placeholder="Valgfrit"
                />
              </label>
              <label className={fieldError(`line-${l.id}-qty`) ? 'has-error' : ''}>
                Antal *
                <input
                  value={l.qty}
                  onChange={(e) => updateLine(l.id, 'qty', e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, [`line-${l.id}-qty`]: true }))}
                  inputMode="decimal"
                />
                {fieldError(`line-${l.id}-qty`) && <em>{fieldError(`line-${l.id}-qty`)}</em>}
              </label>
              <label className={fieldError(`line-${l.id}-price`) ? 'has-error' : ''}>
                Samlet pris *
                <input
                  value={l.lineTotal}
                  onChange={(e) => updateLine(l.id, 'lineTotal', e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, [`line-${l.id}-price`]: true }))}
                  inputMode="decimal"
                  placeholder="Fx 18500"
                />
                {fieldError(`line-${l.id}-price`) && <em>{fieldError(`line-${l.id}-price`)}</em>}
              </label>
            </div>
          </div>
        ))}

        <div className="reg-totals">
          <span className="reg-total-strong">
            Samlet ordrebeløb <b>{money(totals.orderTotal)}</b>
          </span>
        </div>
        {errors.totals && <p className="reg-error-banner">{errors.totals}</p>}

        {!showBonus ? (
          <button
            type="button"
            className="text-button reg-bonus-toggle"
            onClick={() => setShowBonus(true)}
          >
            + Tilføj bonusvare eller gave
          </button>
        ) : (
          <div className="reg-bonus">
            <div className="reg-line-head">
              <span className="kicker">BONUSVARE ELLER GAVE</span>
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setShowBonus(false);
                  setBonus({ product: '', qty: '1', internalValue: '', note: '' });
                }}
              >
                Fjern
              </button>
            </div>
            <p className="muted" style={{ fontSize: 11, margin: '0 0 10px' }}>
              Intern værdi tæller ikke med i kundens ordrebeløb.
            </p>
            <div className="reg-grid-bonus">
              <label>
                Bonusvare / gave
                <input
                  value={bonus.product}
                  onChange={(e) => setBonus({ ...bonus, product: e.target.value })}
                  placeholder="Fx ekstra bitsæt"
                />
              </label>
              <label>
                Antal
                <input value={bonus.qty} onChange={(e) => setBonus({ ...bonus, qty: e.target.value })} />
              </label>
              <label>
                Intern værdi
                <input
                  value={bonus.internalValue}
                  onChange={(e) => setBonus({ ...bonus, internalValue: e.target.value })}
                  placeholder="Valgfrit"
                />
              </label>
              <label>
                Bemærkning
                <input
                  value={bonus.note}
                  onChange={(e) => setBonus({ ...bonus, note: e.target.value })}
                  placeholder="Valgfrit"
                />
              </label>
            </div>
          </div>
        )}
      </section>

      {/* Section 3 */}
      <section className="card reg-section">
        <span className="kicker">3 · LEVERING OG BEMÆRKNINGER</span>
        <div className="reg-grid-delivery">
          <label>
            Særlig leveringsdato
            <input
              type="date"
              value={delivery.desiredDate}
              onChange={(e) => setD('desiredDate', e.target.value)}
            />
            <span className="reg-help">Lad feltet stå tomt, hvis ordren skal sendes hurtigst muligt.</span>
          </label>
          <label>
            Besked til lager/chauffør
            <input
              value={delivery.driverNote}
              onChange={(e) => setD('driverNote', e.target.value)}
              placeholder="Fx ring 30 minutter før levering eller stil varerne ved bagdøren"
            />
          </label>
          <label>
            Interne bemærkninger
            <input
              value={delivery.internalNotes}
              onChange={(e) => setD('internalNotes', e.target.value)}
              placeholder="Valgfrit"
            />
          </label>
        </div>
      </section>

      <div className="reg-actions">
        <button type="button" className="primary" onClick={goPreview}>
          Fortsæt til oversigt
        </button>
        <button type="button" className="secondary" onClick={() => onCancel?.()}>
          Annullér
        </button>
      </div>
      <p className="muted" style={{ fontSize: 10, marginTop: 12, maxWidth: 560 }}>
        Provision beregnes ud fra sendt omsætning — ikke pr. ordre. Senere kan LeadOS hente CVR og produkter fra
        økonomisystemet.
      </p>
    </div>
  );
}
