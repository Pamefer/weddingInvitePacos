import './App.css';
import React, { useContext, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

import TransitionContext from './context/TransitionContext';

gsap.registerPlugin(SplitText, ScrollTrigger, ScrollToPlugin);

export default function App() {
    const main = useRef();
    const esRef = useRef();
    const enRef = useRef();
    const { completed, toggleCompleted } = useContext(TransitionContext);
    const scrollTween = useRef();
    const snapTriggers = useRef([]);
    const activeIndex = useRef(0); // 0 = español, 1 = inglés
    const intervalRef = useRef(null);
    useEffect(() => {
        toggleCompleted(true);
    }, []);

    const { contextSafe } = useGSAP(
        () => {
            if (!completed) return;

            document.fonts.ready.then(() => {
                if (!esRef.current || !enRef.current) return;

                const splitEs = SplitText.create(esRef.current, { type: "words", aria: "hidden" });
                const splitEn = SplitText.create(enRef.current, { type: "words", aria: "hidden" });

                // estado inicial: español visible, inglés oculto
                gsap.set(enRef.current, { opacity: 0 });
                gsap.from(splitEs.words, {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                    stagger: 0.08,
                    ease: "sine.out",
                });

                const swap = contextSafe(() => {
                    const showingEs = activeIndex.current === 0;
                    const outEl = showingEs ? esRef.current : enRef.current;
                    const inEl = showingEs ? enRef.current : esRef.current;
                    const inWords = showingEs ? splitEn.words : splitEs.words;

                    const tl = gsap.timeline();
                    tl.to(outEl, { opacity: 0, y: -10, duration: 0.4, ease: "sine.in" })
                        .set(inEl, { opacity: 1, y: 0 })
                        .from(inWords, {
                            opacity: 0,
                            y: 20,
                            duration: 0.7,
                            stagger: 0.06,
                            ease: "sine.out",
                        });

                    activeIndex.current = showingEs ? 1 : 0;
                });
                intervalRef.current = setInterval(swap, 3000); // ← guarda el ID aquí, no en el .then()

                return () => {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }
                };
            });

            // resto de tu código de panels/snap scroll, sin cambios
            let panels = gsap.utils.toArray('.panel'),
                scrollStarts = [0],
                snapScroll = value => value;

            panels.forEach((panel, i) => {
                snapTriggers.current[i] = ScrollTrigger.create({
                    trigger: panel,
                    start: "top top"
                });
            });

            ScrollTrigger.addEventListener("refresh", () => {
                scrollStarts = snapTriggers.current.map(trigger => trigger.start);
                snapScroll = ScrollTrigger.snapDirectional(scrollStarts);
            });

            ScrollTrigger.observe({
                type: "wheel,touch",
                onChangeY(self) {
                    if (!scrollTween.current) {
                        let scroll = snapScroll(self.scrollY() + self.deltaY, self.deltaY > 0 ? 1 : -1);
                        goToSection(scrollStarts.indexOf(scroll));
                    }
                }
            })

            ScrollTrigger.refresh();
        },
        {
            dependencies: [completed],
            scope: main,
            revertOnUpdate: true,
        }
    );

    const goToSection = contextSafe((i) => {
        scrollTween.current = gsap.to(window, {
            scrollTo: { y: snapTriggers.current[i].start, autoKill: false },
            duration: 1,
            onComplete: () => (scrollTween.current = null),
            overwrite: true
        });
    });

    return (
        <main ref={main}>
            <section className="description panel light">
                <div>
                    <div className='mainPanel'>
                        <div>
                            <h1 className='logoTitle'>Linkove</h1>
                        </div>
                        <div>
                            <div className="title-swap">
                                <h1 ref={esRef} className="title-lang">Su boda en un Link</h1>
                                <h1 ref={enRef} className="title-lang title-lang-en">Your wedding in one Link</h1>
                            </div>
                            <p>Hecha por alguien que también dijo</p>
                            <p>"sí, acepto"</p>
                        </div>
                    </div>


                    <div className="scroll-down">
                        Scroll down<div className="arrow"></div>
                    </div>
                </div>
            </section>
            <section className="panel dark">ONE</section>
            <section className="panel purple">TWO</section>
            <section className="panel orange">THREE</section>
            <section className="panel red">FOUR</section>
        </main>
    );
}