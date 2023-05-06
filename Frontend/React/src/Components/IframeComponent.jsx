import React, { Component } from "react";
import { Box } from '@mui/material';

function IframeComponent(prop){
        return <Box sx={{ height: '100vh' }}  elevation={3}>
                    <iframe src={prop.url} allowFullScreen style={{frameBorder: '0',position:'relative',top:0,left:0,width:'100%',height: '100%',sandbox:"allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation"}}></iframe>;
               </Box>
            
}

export default IframeComponent;