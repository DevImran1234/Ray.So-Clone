import {  useEffect, useRef } from "react"
import useStore from './Store'
import CodeEditor from './components/ui/CodeEditor'
import { cn } from './lib/utils'
import { fonts, themes } from './options'
import { Card, CardContent } from "./components/ui/card"
// import { Button } from "./components/ui/button"
import ExportOptions from "./components/controlls/ExportOptions"
import ThemeSelect from "./components/controlls/ThemeSelect"
import LanguageSelect from "./components/controlls/LanguageSelect"
import FontSelect from "./components/controlls/FontSelect,"
import FontSizeInput from "./components/controlls/FontSizeInput"
import PaddingSlider from "./components/controlls/PaddingSlider"
import BackgroundSwitch from "./components/controlls/BackgroundSwitche"
import DarkModeSwitch from "./components/controlls/DarkModeSwitch"
import { Resizable } from "re-resizable"

function App() {
  
  const theme = useStore(state => state.theme)
  const padding = useStore(state => state.padding)
  const fontStyle = useStore(state => state.fontStyle)
  const ShowBackground = useStore(state => state.showBackground)
  const editorRef = useRef(null)

   useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    if (queryParams.size === 0) return

    const state = Object.fromEntries(queryParams)

    useStore.setState({
      code:state.code? atob(state.code) : "" , autoDetectLanguage: state.autoDetectLanguage === "true",
      darkMode:state.darkMode === "true",
      fontSize: Number(state.fontSize || 18),
      padding:Number(state.padding || 64)
    })
   } , [])
  return (
    <main className='dark min-h-screen flex justify-center items-center bg-neutral-950 text-white'>
      <link rel='styleSheet' href={themes[theme].theme} crossOrigin='anonymous'/>
      <link rel='styleSheet' href={fonts[fontStyle].src} crossOrigin='anonymous'/>
      <Resizable
        enable={{ left: true, right: true }}
        minWidth={padding * 2 + 400}
      >
      <div className={cn(
            "overflow-hidden mb-2 transition-all ease-out",
            ShowBackground ? themes[theme].background : "ring ring-neutral-900"
          )}
          style={{ padding }}
          ref={editorRef}
        >

      <CodeEditor/>
      </div>
      </Resizable>
       <Card className="fixed bottom-16 py-6 px-8 mx-6 bg-neutral-900/90 backdrop-blur">
        <CardContent className="flex flex-wrap gap-6 p-0">
          <ThemeSelect/>
          <LanguageSelect/>
          <FontSelect/>
          <FontSizeInput/>
          <PaddingSlider/>
          <BackgroundSwitch/>
          <DarkModeSwitch/>
          <div className="w-px bg-neutral-800" />
          <div className="place-self-center">
            <ExportOptions targetRef={editorRef} />
          </div>
         </CardContent>
       </Card>
    </main>
  )
}

export default App
