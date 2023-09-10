import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestion = async (board: Board,userId: string) => {
    const todos = formatTodosForAI(board, userId);    
    const res = await fetch("/api/generateSummary",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ todos }),
    });

    const GPTdata = await res.json();
    const { content } = GPTdata;

    return content;
}

export default fetchSuggestion;