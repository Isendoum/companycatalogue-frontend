import { TableBody, TableCell, TableRow, Table, TableHead } from "@material-ui/core";
import "./List.css"



const List = ({ list, onClick }) => {



    return <div style={{ display: "inline-flex", flexDirection: "column", marginTop: 10 }}>

        {(list && list.ArrayList !== "") ?
            <Table style={{ borderWidth: 1, borderColor: "black", borderStyle: "solid", minWidth: 400 }}>
                <TableHead>
                    <TableRow>
                        {list ? Object.keys(list.ArrayList[0].item[0]).map((key, index) => {
                            return <TableCell key={index} >{key}</TableCell>
                        }) : null}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {list ? list.ArrayList[0].item.map((item, index) => <TableRow className="Row" key={index} >

                        {Object.keys(item).map((key, index) => {
                            return <TableCell key={index} onClick={() => onClick(item)} >{item[key]}</TableCell>
                        })}
                    </TableRow>) : null}
                </TableBody>
            </Table> :
            <p>Δεν βρέθηκαν εγγραφές</p>}
    </div>


}
export default List;