import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-provider";

export default function Header(props: any) {
    return (
        <header className="flex h-[60px] items-center border-b px-4 md:px-6">
            <Button className="mr-4 lg:hidden" size="icon" variant="outline">
                {/* <MenuIcon className="h-5 w-5" /> */}
                <span className="sr-only">Toggle navigation</span>
            </Button>
            <Link className="flex items-center gap-2 font-semibold" href="#">
                {/* <CpuIcon className="h-6 w-6" /> */}
                <span className="">{props.title}</span>
            </Link>
            <div className="ml-auto flex items-center gap-4">
                {/* <Button className="h-8 w-8" size="icon" variant="outline">
                    <span className="sr-only">Toggle notifications</span>
                </Button> */}
                <ModeToggle />
                <Button className="h-8 w-8" size="icon" variant="outline">
                    <img
                        alt="Avatar"
                        className="rounded-full"
                        height="32"
                        src="/placeholder.svg"
                        style={{
                            aspectRatio: "32/32",
                            objectFit: "cover",
                        }}
                        width="32"
                    />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
            </div>
        </header>
    )
}