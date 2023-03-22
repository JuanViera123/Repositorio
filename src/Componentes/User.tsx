import { CardContent } from "@mui/material";
import {Typography} from "@mui/material";
import {fetchEventos, fetchLugares, fetchUser} from '../api';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkHasToken } from "../utils";
import { Card, CardGroup, Col, Row } from "react-bootstrap";
import Lugares from "./lugares";
import Eventos from "./Eventos";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function User(){
    const [state, setState] = useState<any>({});

    let {username} = useParams();

    useEffect(() => {
        fetchUser(username).then(async (data: any) => {
            const lugares = await fetchLugares(data?.id).then((places: any) => places);
            const eventos = await fetchEventos(data?.id).then((events: any) => events);
            setState({user: data, lugares: lugares, eventos: eventos});
        });
    }, []);
     
    if(!checkHasToken()){
        window.location.replace("/Login");
        return null;
        }
    
    return(
        <div className="User">
            <Card>
            <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                {state?.user?.username}
                </Typography>
                <Typography gutterBottom variant='h5' component='div'>
                {state?.user?.email}
                </Typography>
            </CardContent>
            </Card>
            <br/>
            <br/>
            {(state?.lugares && <Lugares lugares={state?.lugares}/>)}
            {(state?.eventos && <Eventos eventos={state?.eventos}/>)}
        </div>
    );
}

export default User;