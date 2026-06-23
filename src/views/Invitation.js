import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import Carousel from './Carousel';

import lapromesa from '../static/suertetenerte2.m4a';

import anillos from '../static/anillos.png';
import bola from '../static/bola.png';

import principalPic from '../static/main.jpg';
import nieve from '../static/m_c1.jpg';
import anillospic from '../static/m_c2.jpg';
import foto8 from '../static/m_c4.jpg';
import foto9 from '../static/mc5.jpg';
import foto10 from '../static/m_c6.jpg';
import gradas from '../static/mc_8.jpg';

import '../App.css';
import Pause from '../components/Pause';
import Play from '../components/Play';
import { LABELS, EVENT } from '../labels';

function Invitation() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    const nosCasamosArray = Array.from(LABELS.nosCasamos);

    const containerMainDate = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const letterAnimation = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1, y: 0,
            transition: {
                duration: 0.8, // duración individual de cada letra
                ease: "easeOut",
            },
        },
    };

    const containerpc = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.4,
            },
        },
    };

    const itempc = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.8,
                ease: "easeOut",
            },
        },
    };

    useEffect(() => {
        const handleUserInteraction = () => {
            if (!hasInteracted && audioRef.current) {
                audioRef.current.play()
                    .then(() => setIsPlaying(true))
                    .catch(err => console.log('Autoplay blocked:', err));
                setHasInteracted(true);
            }
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (audioRef.current) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                }
            } else {
                if (audioRef.current) {
                    audioRef.current
                        .play()
                        .then(() => {
                            setIsPlaying(true); // ✅ Actualiza ícono si se pudo reproducir
                        })
                        .catch(() => {
                            setIsPlaying(false); // ✅ Si falla, se asegura que muestre "Play"
                            console.log("Requiere interacción del usuario para reanudar el audio.");
                        });
                }
            }
        };

        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('click', handleUserInteraction);
            document.addEventListener('visibilitychange', handleVisibilityChange);

        };
    }, [hasInteracted]);

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play()
                .then(() => {
                    console.log("playing")
                    setIsPlaying(true);
                    setHasInteracted(true); // mark interaction so autoplay won't retry
                })
                .catch(err => console.log('Play failed:', err));
        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className="App">
            <audio ref={audioRef} loop preload="metadata">
                <source src={lapromesa} />
            </audio>
            <div>
                <div className="firstSection">
                    <img src={principalPic} alt="pameycos" className="background-image" />

                    <div className="audio-controls">
                        {isPlaying ? <Pause onPlayerClick={handlePause} /> : <Play onPlayerClick={handlePlay} />}
                    </div>

                    <motion.div
                        className="namesContainer"
                        variants={containerpc}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.p className="pame" variants={itempc}>{EVENT.bride}</motion.p>
                        <motion.p className="cosme" variants={itempc}>{EVENT.groom}</motion.p>
                    </motion.div>

                    <div className="quoteContainer">
                        <motion.p
                            variants={containerMainDate}
                            initial="hidden"
                            animate="visible"
                            className="quotePhrase"
                        >
                            {nosCasamosArray.map((char, index) => (
                                <motion.span key={index} variants={letterAnimation}>
                                    {char}
                                </motion.span>
                            ))}
                        </motion.p>
                        <p className="dateFirst">{EVENT.date}</p>
                    </div>
                </div>

                <div className="secondSection normalText">
                    <p>{LABELS.initialPhrase}</p>
                    <div >
                        <motion.img
                            src={nieve}
                            alt="Foto especial"
                            className="centralSquare"
                            initial={{
                                clipPath: 'inset(0 50% 0 50%)',
                                opacity: 0,
                            }}
                            whileInView={{
                                clipPath: 'inset(0 0% 0 0%)',
                                opacity: 1,
                            }}
                            transition={{
                                duration: 2,
                                ease: [0.3, 0, 0.4, 1],
                            }}
                            viewport={{ once: true }}
                        />
                    </div>
                    <p>
                        {LABELS.secondPhrase}
                    </p>
                    <p>
                        {LABELS.thirdPhrase}
                    </p>
                    <div className="nuestraBoda">

                        <motion.p
                            className="cursiveTextMea line-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 5, delay: 0.5 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            {LABELS.nuestra}
                        </motion.p>
                        <motion.p
                            className="cursiveTextMea line-end"
                            initial={{ opacity: 0, y: 20 }}
                            transition={{ duration: 5 }}
                            viewport={{ once: true, amount: 0.7 }}
                            whileInView={{ opacity: 1, y: 0 }}
                        >
                            {LABELS.boda}
                        </motion.p>
                    </div>

                    <div >
                        <img src={anillospic} alt="manos" className="centralCircle"></img>
                    </div>
                </div>

                <motion.div
                    className="section thirdSection normalText"
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.1 }}
                    whileInView={{ opacity: 1, y: 0 }}>
                    <p className="subtitle cursiveTextMea">{LABELS.ceremonia}</p>
                    <div className="iconos">
                        <img src={anillos} alt="anillos" ></img>
                    </div>
                    <div>
                        <p>{EVENT.dateLetters}</p>
                        <p>{EVENT.hour}</p>
                        <p className="smallText">{EVENT.address}</p>

                    </div>

                    <a
                        href={EVENT.linkAddress}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="maps-button buttonweb"
                    >
                        {LABELS.verUbicacion}
                    </a>
                </motion.div>
                <div className="section fourthSection normalText">
                    <p className="subtitle cursiveTextMea">{LABELS.codigoVestimenta}</p>
                    <p>{LABELS.tipoVestimenta}</p>
                    <p>{LABELS.evitar}</p>
                    <div className="colorsWedding">
                        <div className="circle blanco"></div>
                        <div className="circle rojo"></div>
                        <div className="circle rosa"></div>
                    </div>
                </div>
                <div className="container-gradas">
                    <img src={gradas} alt="manos" className="gradas"></img>
                </div>
                <motion.div
                    className="section fifthSection normalText"
                    initial={{ opacity: 0, y: -100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.4 }}>
                    <p className="subtitle cursiveTextMea">{LABELS.regalos}</p>

                    <p>{LABELS.suPresencia}</p>
                </motion.div>
                <div className="picturesInline">
                    <img src={foto8} alt="manos" className="normalPic"></img>
                    <img src={foto10} alt="manos" className="normalPic"></img>
                    <img src={foto9} alt="manos" className="normalPic"></img>

                </div>
                <div className="section sixthSection normalText">
                    <p className="subtitle cursiveTextMea">{LABELS.nosAyudasPlaylist} </p>
                    <div className="iconos">
                        <img src={bola} alt="bola"></img>
                    </div>

                    <a
                        href={EVENT.linkRSPV}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="maps-button buttonweb bola"
                    >
                        {LABELS.cancion}
                    </a>

                </div>
                <Carousel />
                <div className="section seventhSection normalText">
                    <p className="subtitle">{LABELS.nosAcompanas}</p>
                    <p>{LABELS.confirmanos}</p>
                    <a
                        href={EVENT.linkWhatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="maps-button buttonweb bola"
                    >
                        {LABELS.confirmar}
                    </a>
                </div>
                <motion.div
                    className="section eigthSection normalText"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <p className="subtitle cursiveTextMea">{LABELS.gracias}</p>

                </motion.div>
                <img src={gradas} alt="manosfinal" className="gradas"></img>
            </div>

        </div >
    );
}

export default Invitation;
