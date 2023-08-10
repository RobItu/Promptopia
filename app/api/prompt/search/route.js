import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    const filteredPrompts = prompts.filter();

    return new Response(JSON.stringify(filteredPrompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch", { status: 500 });
  }
};
