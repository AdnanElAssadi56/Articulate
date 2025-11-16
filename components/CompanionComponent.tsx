'use client';

import {useEffect, useRef, useState} from 'react'
import {cn, configureAssistant} from "@/lib/utils";
import {vapi} from "@/lib/vapi.sdk";
import Image from "next/image";
import Lottie, {LottieRefCurrentProps} from "lottie-react";
import soundwaves from '@/constants/soundwaves.json'
import {addToSessionHistory} from "@/lib/actions/companion.actions";
import {getCategoryLightColor} from "@/constants/categories";
import SessionTimer from "./SessionTimer";
import DownloadTranscript from "./DownloadTranscript";
import ConversationStats from "./ConversationStats";
import ConversationInsights from "./ConversationInsights";
import QuickTips from "./QuickTips";
import type { CompanionComponentProps, SavedMessage, Message } from "@/types";

enum CallStatus {
    INACTIVE = 'INACTIVE',
    CONNECTING = 'CONNECTING',
    ACTIVE = 'ACTIVE',
    FINISHED = 'FINISHED',
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice, category, description, hasProAccess = false }: CompanionComponentProps) => {
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<SavedMessage[]>([]);
    
    // Get avatar based on voice
    const getAvatarIcon = () => {
        if (voice === 'female' || voice.includes('female')) return '/icons/female-avatar.svg';
        if (voice === 'male' || voice.includes('male')) return '/icons/male-avatar.svg';
        if (voice === 'quran') return '/icons/male-avatar.svg';
        return '/icons/male-avatar.svg';
    };
    
    const lightColor = getCategoryLightColor(category || 'academic');
    
    // Save to recent advisors when call starts
    useEffect(() => {
        if (callStatus === CallStatus.ACTIVE) {
            const recentAdvisors = JSON.parse(localStorage.getItem('recentAdvisors') || '[]');
            const newRecent = {
                id: companionId,
                name,
                category: category || 'academic',
                voice,
                lastUsed: new Date().toISOString(),
            };
            
            // Remove if already exists and add to front
            const filtered = recentAdvisors.filter((a: any) => a.id !== companionId);
            const updated = [newRecent, ...filtered].slice(0, 5);
            localStorage.setItem('recentAdvisors', JSON.stringify(updated));
        }
    }, [callStatus, companionId, name, category, voice]);

    const lottieRef = useRef<LottieRefCurrentProps>(null);

    useEffect(() => {
        if(lottieRef) {
            if(isSpeaking) {
                lottieRef.current?.play()
            } else {
                lottieRef.current?.stop()
            }
        }
    }, [isSpeaking, lottieRef])

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

        const onCallEnd = () => {
            setCallStatus(CallStatus.FINISHED);
            addToSessionHistory(companionId)
        }

        const onMessage = (message: Message) => {
            if(message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage= { role: message.role, content: message.transcript}
                setMessages((prev) => [newMessage, ...prev])
            }
        }

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);

        const onError = (error: Error) => console.log('Error', error);

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);

        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd);
        }
    }, []);

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted)
    }

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING)

        const assistantOverrides = {
            variableValues: { subject, topic, style, description: description || 'Experienced advisor ready to help' },
            clientMessages: ["transcript"],
            serverMessages: [],
        }

        // @ts-expect-error
        vapi.start(configureAssistant(voice, style, category), assistantOverrides)
    }

    const handleDisconnect = () => {
        setCallStatus(CallStatus.FINISHED)
        vapi.stop()
    }

    return (
        <section className="flex flex-col min-h-[75vh] gap-6 pb-8">
            {/* Quick Tips */}
            {callStatus === CallStatus.INACTIVE && <QuickTips />}

            {/* Session Controls Bar */}
            <div className="flex items-center justify-between gap-4 max-sm:flex-col">
                <SessionTimer isActive={callStatus === CallStatus.ACTIVE} />
                <DownloadTranscript messages={messages} advisorName={name} />
            </div>

            {/* Conversation Stats & Insights */}
            {messages.length > 0 && callStatus === CallStatus.FINISHED && (
                <>
                    <ConversationStats messages={messages} />
                    <ConversationInsights messages={messages} hasProAccess={hasProAccess} />
                </>
            )}

            <section className="flex gap-6 max-sm:flex-col">
                {/* Advisor Section */}
                <div className="companion-section">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                        <span className="text-sm font-medium text-muted-foreground">
                            {callStatus === CallStatus.ACTIVE ? 'Active' : callStatus === CallStatus.CONNECTING ? 'Connecting...' : 'Ready'}
                        </span>
                    </div>
                    
                    <div className="companion-avatar" style={{ backgroundColor: lightColor }}>
                        <div
                            className={
                            cn(
                                'absolute transition-opacity duration-1000', 
                                callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0', 
                                callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                            )
                        }>
                            <div className="w-40 h-40 rounded-full flex items-center justify-center shadow-2xl" style={{ backgroundColor: lightColor }}>
                                <Image
                                    src={getAvatarIcon()}
                                    alt={name}
                                    width={120}
                                    height={120}
                                    className="rounded-full opacity-90"
                                />
                            </div>
                        </div>

                        <div className={cn('absolute transition-opacity duration-1000', callStatus === CallStatus.ACTIVE ? 'opacity-100': 'opacity-0')}>
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoplay={false}
                                className="companion-lottie"
                            />
                        </div>
                    </div>
                    
                    <div className="text-center">
                        <p className="font-bold text-2xl mb-1">{name}</p>
                        <p className="text-sm text-muted-foreground">{subject} Advisor</p>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="user-section">
                    <div className="user-avatar">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                            <Image src={userImage} alt={userName} width={96} height={96} className="object-cover" />
                        </div>
                        <p className="font-bold text-xl">{userName}</p>
                    </div>
                    
                    <button 
                        className="btn-mic" 
                        onClick={toggleMicrophone} 
                        disabled={callStatus !== CallStatus.ACTIVE}
                    >
                        <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                            isMuted ? "bg-destructive/10" : "bg-success/10"
                        )}>
                            <Image 
                                src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'} 
                                alt="mic" 
                                width={24} 
                                height={24} 
                            />
                        </div>
                        <p className="text-sm font-medium max-sm:hidden">
                            {isMuted ? 'Unmute' : 'Mute'}
                        </p>
                    </button>
                    
                    <button 
                        className={cn(
                            'rounded-xl py-4 px-6 cursor-pointer transition-all w-full text-white font-semibold shadow-lg hover:shadow-xl',
                            callStatus === CallStatus.ACTIVE ? 'bg-destructive hover:bg-destructive/90' : 'bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-accent',
                            callStatus === CallStatus.CONNECTING && 'animate-pulse'
                        )} 
                        onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
                    >
                        {callStatus === CallStatus.ACTIVE
                        ? "End Session"
                        : callStatus === CallStatus.CONNECTING
                            ? 'Connecting...'
                        : 'Start Session'
                        }
                    </button>
                </div>
            </section>

            {/* Transcript Section */}
            <section className="transcript">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                        <div className="text-6xl opacity-20">💬</div>
                        <p className="text-muted-foreground">
                            {callStatus === CallStatus.INACTIVE 
                                ? "Start a session to begin your conversation" 
                                : "Conversation will appear here..."}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="transcript-message no-scrollbar">
                            {messages.map((message, index) => {
                                if(message.role === 'assistant') {
                                    return (
                                        <div key={index} className="flex gap-3 items-start">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                AI
                                            </div>
                                            <div className="flex-1 bg-muted/50 rounded-2xl rounded-tl-none px-4 py-3">
                                                <p className="text-sm font-medium text-primary mb-1">
                                                    {name.split(' ')[0]}
                                                </p>
                                                <p className="text-base leading-relaxed">{message.content}</p>
                                            </div>
                                        </div>
                                    )
                                } else {
                                   return (
                                        <div key={index} className="flex gap-3 items-start flex-row-reverse">
                                            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                                <Image src={userImage} alt={userName} width={32} height={32} className="object-cover" />
                                            </div>
                                            <div className="flex-1 bg-primary/10 rounded-2xl rounded-tr-none px-4 py-3">
                                                <p className="text-sm font-medium text-primary mb-1">You</p>
                                                <p className="text-base leading-relaxed">{message.content}</p>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div>
                        <div className="transcript-fade" />
                    </>
                )}
            </section>
        </section>
    )
}

export default CompanionComponent