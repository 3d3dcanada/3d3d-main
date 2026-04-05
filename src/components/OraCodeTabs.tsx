import { useId, useMemo, useState } from 'react';

import type { CodeExample } from '../data/oraPresentation';

interface Props {
  examples: CodeExample[];
}

export default function OraCodeTabs({ examples }: Props) {
  const initialTab = examples[0]?.id ?? '';
  const [activeTab, setActiveTab] = useState(initialTab);
  const baseId = useId();

  const activeExample = useMemo(
    () => examples.find((example) => example.id === activeTab) ?? examples[0],
    [activeTab, examples]
  );

  if (!activeExample) return null;

  return (
    <div className="ora-code-tabs">
      <div className="ora-code-tabs__list" role="tablist" aria-label="ORA code examples">
        {examples.map((example) => {
          const tabId = `${baseId}-${example.id}-tab`;
          const panelId = `${baseId}-${example.id}-panel`;
          const selected = activeExample.id === example.id;

          return (
            <button
              key={example.id}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={panelId}
              className={`ora-code-tabs__trigger ${selected ? 'is-active' : ''}`}
              onClick={() => setActiveTab(example.id)}
            >
              <span className="ora-code-tabs__eyebrow">{example.eyebrow}</span>
              <span className="ora-code-tabs__label">{example.label}</span>
              <span className="ora-code-tabs__summary">{example.summary}</span>
            </button>
          );
        })}
      </div>

      <section
        id={`${baseId}-${activeExample.id}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-${activeExample.id}-tab`}
        className="ora-code-tabs__panel"
      >
        <div className="ora-code-tabs__meta">
          {activeExample.proofPoints.map((point) => (
            <span key={point} className="ora-code-tabs__pill">
              {point}
            </span>
          ))}
        </div>

        <div className="ora-code-tabs__code-grid">
          <div className="ora-code-tabs__code">
            <div className="ora-code-tabs__code-header">
              <span>Request</span>
              <span>JSON</span>
            </div>
            <pre>
              <code>{activeExample.request}</code>
            </pre>
          </div>

          <div className="ora-code-tabs__code">
            <div className="ora-code-tabs__code-header">
              <span>Response</span>
              <span>Governed output</span>
            </div>
            <pre>
              <code>{activeExample.response}</code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}
