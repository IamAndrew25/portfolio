import type { Locale } from "@/shared/i18n/locales";

function Chassis() {
    return <div className="system-chassis"><i /><i /><i /><i /><span>AO / SYSTEM STUDIES</span></div>;
}

/** Illustrative objects, not a screenshot or a live model response. */
export function SystemVisual({ kind, locale }: { kind: "rag" | "review"; locale: Locale }) {
    const english = locale === "en";

    return (
        <figure className={`project-visual system-visual ${kind}-visual`}>
            <div className="system-scene" aria-hidden="true">
                <Chassis />
                {kind === "rag" ? (
                    <>
                        <svg className="system-traces" viewBox="0 0 600 400" fill="none">
                            <path d="M110 135v100h165v60h205V155" />
                            <path d="M120 146v78h167v59h181V170" />
                            <circle cx="110" cy="135" r="5" /><circle cx="480" cy="155" r="5" />
                        </svg>
                        <div className="document-stack">
                            <div className="document-sheet sheet-back" />
                            <div className="document-sheet sheet-middle" />
                            <div className="document-sheet sheet-front">
                                <div className="document-heading"><span>NA.</span><small>RESEARCH / 01</small></div>
                                <strong>Nexo Andino</strong>
                                <span className="document-subtitle">{english ? "Financial knowledge base" : "Base documental financiera"}</span>
                                <div className="document-rules"><i /><i /><i /></div>
                                <div className="document-table"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
                                <span className="document-footer">PDF / MD / TXT</span>
                            </div>
                        </div>
                        <div className="retrieval-processor">
                            <span className="processor-pins" />
                            <div className="processor-face"><small>RETRIEVAL</small><strong>RAG</strong><span>ChromaDB</span></div>
                        </div>
                        <div className="answer-panel">
                            <div className="instrument-heading"><span className="instrument-light" />POST /questions<span>↗</span></div>
                            <span className="instrument-eyebrow">{english ? "RESPONSE CONTRACT" : "CONTRATO DE RESPUESTA"}</span>
                            <strong>answer<span> + </span>sources</strong>
                            <div className="answer-lines"><i /><i /><i /></div>
                            <div className="source-receipt"><b>[01]</b><div><span>document · chunk_id</span><small>{english ? "Traceable source excerpt" : "Fragmento de fuente verificable"}</small></div></div>
                        </div>
                        <div className="system-plaque"><span>01</span><div><b>{english ? "Context before generation" : "Contexto antes de generar"}</b><small>FastAPI → Chroma → Gemini</small></div></div>
                    </>
                ) : (
                    <>
                        <div className="review-terminal">
                            <div className="instrument-heading"><span className="window-dots"><i /><i /><i /></span><span>code-review-agent</span><span>PY</span></div>
                            <div className="review-file">target_project / app.py<span>{english ? "TEST FIXTURE" : "EJEMPLO DE PRUEBA"}</span></div>
                            <div className="review-code">
                                <div><span>01</span><code><em>def</em> run(expr):</code></div>
                                <div><span>02</span><code>    <em>return</em> <b>eval(expr)</b></code></div>
                                <div className="code-divider" />
                                <div><span>03</span><code><em>def</em> get_user(name):</code></div>
                                <div><span>04</span><code>    query = <i>&quot;SELECT ...&quot;</i></code></div>
                            </div>
                            <div className="terminal-footer"><span>{english ? "READ-ONLY TOOLS" : "HERRAMIENTAS DE LECTURA"}</span><span>Python / Qwen</span></div>
                        </div>
                        <div className="review-tool-dock"><span>ƒ</span><div><code>list_files()</code><code>read_file()</code></div></div>
                        <div className="review-finding"><span className="finding-symbol">!</span><div><small>{english ? "KNOWN FIXTURE ISSUE" : "FALLO CONOCIDO DEL EJEMPLO"}</small><b>{english ? "Unchecked eval()" : "eval() sin validación"}</b><span>app.py → run(expr)</span></div></div>
                        <div className="review-turns"><b>10</b><span>{english ? "MODEL TURNS MAX." : "TURNOS MÁX. DEL MODELO"}</span></div>
                    </>
                )}
            </div>
            <figcaption>{english ? "System illustration" : "Ilustración del sistema"} · {kind === "rag" ? (english ? "Document → context → answer" : "Documento → contexto → respuesta") : (english ? "Inspect → read → review" : "Explorar → leer → revisar")}</figcaption>
        </figure>
    );
}
