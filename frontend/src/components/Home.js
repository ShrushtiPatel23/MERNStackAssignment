import React, { useEffect, useState } from 'react';
import { Button, Typography, Box, Paper, Grid, TextField, InputLabel, MenuItem, Select, FormControl } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function Home() {

    const [rows, setRows] = useState([]);
    const [amount, setAmount] = useState('');
    const [name, setName] = useState('');

    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    function onChange(date) {
        setDate(date);
        var dates = new Date(date);
        setStart(date.getFullYear() + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())));
    }
    console.log(date)
    console.log(start)

    function onChange2(date) {
        setDate2(date);
        var date = new Date(date);
        setEnd(date.getFullYear() + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())));
    
    }
    console.log(date2)
    console.log(end)

    const handleDate =async () => {
        if (start && end) {
            await axios.post(`http://localhost:8000/data/date`,
                    {
                        start: start,
                        end: end
                    }
                )
                    .then((response) => {
                        console.log(response)
                        setRows(response.data)
                    })
                    .catch((error) => console.log(error))
        }
    }

    const getData = async (e) => {
        if (name) {
            await axios.get(`http://localhost:8000/data/search?query=${name}`)
                .then((response) => {
                    console.log(response.data)
                    setRows(response.data)
                })
                .catch((error) => console.log(error))

        }

        else {
            await axios.get('http://localhost:8000/data/')
                .then((response) => {
                    console.log(response.data.datas)
                    setRows(response.data.datas)
                })
                .catch((error) => console.log(error))

        }
    }

    const getamountData = async () => {
        if (amount) {
            //  console.log(amount)
            if (amount === 100) {
                console.log(100)
                await axios.post(`http://localhost:8000/data/amount1`,
                    {
                        gte: "100"
                    }
                )
                    .then((response) => {
                        console.log(response)
                        setRows(response.data)
                    })
                    .catch((error) => console.log(error))
            } if (amount === 200) {
                console.log(200)
                await axios.post(`http://localhost:8000/data/amount2`, {

                    lte: 200

                })
                    .then((response) => {
                        console.log(response.data)
                        setRows(response.data)
                    })
                    .catch((error) => console.log(error))
            } if (amount === 100200) {
                console.log(300)
                await axios.post(`http://localhost:8000/data/amount3`, {

                    lte: 200,
                    gte: 100

                })
                    .then((response) => {
                        console.log(response.data)
                        setRows(response.data)
                    })
            }
        } else {
            await axios.get('http://localhost:8000/data/')
                .then((response) => {
                    console.log(response.data.datas)
                    setRows(response.data.datas)
                })
                .catch((error) => console.log(error))

        }
    }

    const handleChangeName = async (e) => {
        setName(e.target.value)
        setAmount("")
    }

    const handleChangeAmount = async (e) => {
        setAmount(e.target.value)
        setName("")
    }

    const handleFilter = () => {
        setName("");
        setAmount("");
        setDate(new Date());
        setDate2(new Date())
        // setDate("");
    }

    useEffect(() => {
        getData()
    }, [name])

    useEffect(() => {
        getamountData()
    }, [amount])


    return (
        <Box sx={{ flexGrow: 1, p: 8, m: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ m: 2, fontWeight: 'bold', fontSize: 16 }}>Date</Typography>

                        <DatePicker selected={date} onChange={onChange} dateFormat="yyyy-MM-dd" className='datepicker-container' />

                        <Typography sx={{ m: 2, fontWeight: 'bold', fontSize: 16 }}>to</Typography>
                        <DatePicker selected={date2} onChange={onChange2} dateFormat="yyyy-MM-dd" className='datepicker-container' />
                        <Button variant='contained' size='small' sx={{height:'30px', m:1, p:2, ml:4}} onClick={handleDate}>Apply</Button>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ m: 2, fontWeight: 'bold', fontSize: 16 }}>Name</Typography>
                        <TextField sx={{ boxShadow: 2 }}
                            placeholder="Search Name"
                            fullWidth
                            name='name'
                            value={name}
                            onChange={handleChangeName}
                        />
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography sx={{ m: 2, fontWeight: 'bold', fontSize: 16 }}>Amount</Typography>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Amount</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={amount}
                                label="Amount"
                                sx={{ boxShadow: 2 }}
                                onChange={handleChangeAmount}
                            >
                                <MenuItem value={100}>amount &gt;= 100</MenuItem>
                                <MenuItem value={200}>amount &lt;= 200</MenuItem>
                                <MenuItem value={100200}>amount 100-200</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ boxShadow: 2 }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 200 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 15 }}>Date</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 15 }}>Name</TableCell>
                                        <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 15 }}>Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center" sx={{ fontSize: 13, color: 'grey', fontWeight: 'bold' }}>
                                                {row.date}
                                            </TableCell>
                                            <TableCell align="center" sx={{ fontSize: 13, color: 'grey', fontWeight: 'bold' }}>
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center" sx={{ fontSize: 13, color: 'grey', fontWeight: 'bold' }}>{row.amount}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Box>
                    <Button variant='contained' sx={{ m: 4 }} onClick={handleFilter}>Clear Filter</Button>
                </Grid>
            </Grid>
        </Box>
    );
}