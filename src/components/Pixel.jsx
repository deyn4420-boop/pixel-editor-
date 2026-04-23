export default function Pixel({ color, onClick}){
    return(
        <div
        onClick={onClick}
        style= {{
            width: 20,
            height: 20,
            backgroundColor: color,
            border: "1px solid #ccc"
}}
/>
        
);     

    }
