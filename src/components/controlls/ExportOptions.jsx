import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Button } from '../ui/button'
import { DownloadIcon, ImageIcon, Link2Icon, Share2Icon } from '@radix-ui/react-icons'
import { toBlob, toPng, toSvg } from 'html-to-image'
import toast from 'react-hot-toast'
import useStore from '@/Store'

export default function ExportOptions({targetRef }) {
    const title = useStore(state => state.title)
    const copyImage = async () => {
        const imgBlob = await toBlob(targetRef.current, {
            pixelRatio: 2
        })
        const img = new ClipboardItem({"image/png" : imgBlob})
        navigator.clipboard.write([img])
    }
    const copyLink =  () => {
      const state = useStore.getState()
      const queryParams = new URLSearchParams({
        ...state,
        code: btoa(state.code)
      }).toString()
      navigator.clipboard.writeText(`${location.href} ?${queryParams}`)
    }
    const saveImage = async (name , format) => {
        let imageUrl , filename 

        switch (format) {
            case "PNG":
                
                imageUrl = await toPng(targetRef.current, {pixelRatio: 2})
                filename =` ${name}.png`
                break;
                case "SVG":
                  imageUrl = await toSvg(targetRef.current, {pixelRatio:2})
                  filename = `${name}.svg`
                  break


               default:
                break;
        }
        const a = document.createElement("a")
        a.href = imageUrl
        a.download = filename
        a.click()
    }
  return (
    <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button>
                <Share2Icon className='mr-2'/>
                Export
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="dark">
          <DropdownMenuItem className="gap-2" onClick={() => toast.promise(copyImage(),{
            loading: "Copying....",
            success:"Image Copied Clipboard!",
            error:"Something went wrong!"
          })}>
              <ImageIcon />
              Copy Image
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-2"
          onClick={() => {
            copyLink()
            toast.success("Link Copied to clipboard!")
          }}
          >
              <Link2Icon />
              Copy Link
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
          <DropdownMenuItem className="gap-2"
           onClick={() => toast.promise(saveImage(title ,"PNG"),{
            loading: "Exposrting Png image....",
            success:"Exported successfully!",
            error:"Something went wrong!"
          })
        }
          >
              <DownloadIcon />
                Save as PNG
              </DropdownMenuItem>
          <DropdownMenuItem className="gap-2"
           onClick={() => toast.promise(saveImage(title ,"SVG"),{
            loading: "Exposrting SVG image....",
            success:"Exported successfully!",
            error:"Something went wrong!"
          })
        }
          >
              <DownloadIcon />
                Save as SVG
              </DropdownMenuItem>
         </DropdownMenuContent>
    </DropdownMenu>
  )
}
