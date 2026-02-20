import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const {text, setLanguage} = await request.json();

    try{

        
    }catch(error){
        console.log(error)
    }
}