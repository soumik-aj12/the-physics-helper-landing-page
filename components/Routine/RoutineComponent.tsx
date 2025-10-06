import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
const RoutineComponent = ({header, year, setNo, data}:{header:string, year:string, setNo:string, data:Array<{day:string, time:string, mode:string}>}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>{header}</span>
                    {/* <span>Set - 1(1st Class)</span> */}
                    <Badge variant="secondary" className="text-sm">{year}</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableCaption>{`SET ${setNo}`}</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-start">Day</TableHead>
                            <TableHead className="w-[100px] text-center">Time</TableHead>
                            <TableHead className="text-end">Mode of class</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((routine, index) => (
                            <TableRow key={index}>
                                <TableCell className="text-start">{routine.day}</TableCell>
                                <TableCell className="w-[100px] text-center">{routine.time}</TableCell>
                                <TableCell className="text-end">{routine.mode}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default RoutineComponent