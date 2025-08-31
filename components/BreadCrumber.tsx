import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BreadcrumbProps } from "@/lib/types"

export function Breadcrumber({ start, end, dropdownItems, startLink, endLink }: BreadcrumbProps) {
    return (
        <Breadcrumb className="text-gray-800 py-3">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href={startLink}>{start}</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Link href={endLink}>{end}</Link>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {dropdownItems.map((item, index) => (
                                <DropdownMenuItem key={index}>
                                    <Link href={item.link}>{item.label}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
