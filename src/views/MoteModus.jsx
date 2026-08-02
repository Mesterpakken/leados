import { useEffect, useState } from 'react';
import { getEmployeeById, getMeetingMocks } from '../data';

const agendaFallback = [
  'Anerkend stabil performance',
  'Tag ansvar for manglende opfølgning',
  'Spørg ind til motivationen',
  'Vend tilbage til teamlead-målet',
  'Aftal næste skridt',
];

export default function MoteModus({ employeeId, onStopMeeting }) {
  const employee = getEmployeeById(employeeId) || { name: 'Camilla Holm' };
  const mocks = getMeetingMocks(employeeId);
  const agenda = employee.meetingBrief?.agenda || agendaFallback;
  const [checked, setChecked] = useState([]);
  const [seconds, setSeconds] = useState(12 * 60 + 48);
  const bullets = mocks?.transcription || [
    'Camilla vil gerne prøve teamlead-ansvaret af uden at opgive sin egen portefølje.',
    '“Jeg mistede lidt troen på, at der skete noget efter vores sidste samtale.”',
    'Camilla tager mandagens warmup de næste to uger.',
  ];

  useEffect(() => {
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="meeting-live">
      <header>
        <div>
          <span className="live-dot" />
          <span>
            OPTAGER · {mm}:{ss}
          </span>
        </div>
        <h2>1:1 med {employee.name}</h2>
        <button type="button" onClick={onStopMeeting}>
          ■ Stop møde
        </button>
      </header>
      <main>
        <section>
          <span className="kicker">DAGSORDEN</span>
          <h3>Hold retningen — ikke manuskriptet</h3>
          {agenda.map((x, i) => (
            <button
              key={x}
              type="button"
              className={checked.includes(i) ? 'live-item checked' : 'live-item'}
              onClick={() => setChecked((v) => (v.includes(i) ? v.filter((n) => n !== i) : [...v, i]))}
            >
              <i>{checked.includes(i) ? '✓' : ''}</i>
              <span>{x}</span>
            </button>
          ))}
        </section>
        <section className="transcript">
          <div className="card-head">
            <div>
              <span className="kicker">SAMTALEHUKOMMELSE</span>
              <h3>Lead OS lytter efter det vigtige</h3>
            </div>
            <span className="transcribing">● TRANSSKRIBERER</span>
          </div>
          <div className="wave">
            {Array.from({ length: 11 }).map((_, i) => (
              <i key={i} />
            ))}
          </div>
          <div className="live-insights">
            {bullets.slice(0, 3).map((b, i) => (
              <article key={b}>
                <small>{i === 0 ? 'NYT EMNE' : i === 1 ? 'MOTIVATIONSSIGNAL' : 'MULIG AFTALE'}</small>
                <p>{b}</p>
              </article>
            ))}
          </div>
          <p className="privacy">Demo: optagelse er simuleret · lyd slettes efter behandling i produktion</p>
        </section>
      </main>
    </div>
  );
}
