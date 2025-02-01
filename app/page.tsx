"use client"
import Image from "next/image"
import f1GPTLogo from "./assets/logo.jpg"
import {useChat} from "ai/react"
import {Message} from "ai"
import Bubble from "./components/Bubble"
import PromptSuggestionsRow from "./components/PromptSuggestionsRow"
import LoadingBubble from "./components/LoadingBubble"
const Home = () => {
    const {append, isLoading, messages, input, handleInputChange, handleSubmit} = useChat()
    const noMessages = !messages || messages.length === 0;
    const handlePrompt = (promptText ) => {
        const msg: Message = {
            id: crypto.randomUUID(),
            content: promptText,
            role: "user"
        }
        append(msg)
    }

    return (
        <main>
            <Image src={f1GPTLogo} width="250" alt="f1 gpt logo"/>
            <section className={noMessages ? "" : "populated"}>
                {noMessages ? (
                    <>
                        <p className="starter-text">
                            The Ultimate place for F1 fans!
                            Ask F1GPT anything about the sport and it will
                            come back with the most up-to-date answers.
                        </p>
                        <br/>
                        <PromptSuggestionsRow onPromptClick={handlePrompt}/>
                    </>
                ) : (
                    <>
                    {messages.map((message,index) => <Bubble key={`message-${index}`} message={message}/>)}
                    {isLoading && <LoadingBubble />}
                    </>
                )}
            </section>
                <form onSubmit={handleSubmit}>
                    <input className="question-box" onChange={handleInputChange} value={input} placeholder="Ask me something about f1"/>
                    <input type="submit"/>
                </form>
        </main>
    )
}

export default Home;
