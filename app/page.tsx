
import { PlaygroundProvider } from "@/components/PlaygroundProvider";
import ReactPlayground from "@/components/ReactPlayground";
import Image from "next/image";

export default function Home() {
  return (
    <PlaygroundProvider>
      <ReactPlayground />
    </PlaygroundProvider>
  )
}
