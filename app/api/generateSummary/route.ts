import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    //todos in the body of req
    const {todos} = await request.json();

    //communicate with OpenAI
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [{
            role:"system",
            content:"When responding, always welcome the user with a greeting and say welcome to Varad's Todo App! Limit the response to 200 characters",
        },
        {
            role:"user",
            content:`Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(todos)}`,
        }],
    })

    return NextResponse.json(response.choices[0].message);
    
    

}