import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../components/Title";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(
        0,
        "16 Mar, 2019",
        "Elvis Presley",
        "Studio Ghibli Summer Night Piano",
        "To whoever is reading this, you are loved."
    ),
    createData(
        1,
        "16 Mar, 2019",
        "Paul McCartney",
        "Piano Covered by kno",
        "Most of us are living, but not with the kind of..."
    ),
    createData(
        2,
        "16 Mar, 2019",
        "Tom Scholz",
        "Chill Study Beats",
        "It's 4 A.M and here I am, crying with all those coments"
    ),
    createData(
        3,
        "16 Mar, 2019",
        "Michael Jackson",
        "Studio Ghibli Summer Night Piano",
        "Have you ever asked yourself: is this it?"
    ),
    createData(
        4,
        "15 Mar, 2019",
        "Bruce Springsteen",
        "Piano Covered by kno",
        "Once, when I was younger, I had two of the greatest friends in the world."
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Orders() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Recent Comments</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Video Name</TableCell>
                        <TableCell align="right">Comments</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.shipTo}</TableCell>
                            <TableCell align="right">
                                {row.paymentMethod}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    See more comments
                </Link>
            </div>
        </React.Fragment>
    );
}
