
import {type ChatInputCommandInteraction } from "discord.js";
import { promises} from "fs";
import { downloadVideo } from "../videoDownloader/downloadVideo";



export const downloadVideoCommand = async (interaction: ChatInputCommandInteraction) => {

  const URL = interaction.options.getString("url") ?? "";
  const mediaType = interaction.options.getString("media-type")?? "";
  const path = "temp";

  try {

    await interaction.deferReply();
 
    
    const response = await downloadVideo(interaction,URL,mediaType,"temp") ?? "Video Downloaded";
    
    await interaction.editReply(response);

    await promises.rm(path, { recursive: true, force: true });
    
  } 
  catch (err: unknown){

    if(err instanceof Error)
        console.error(err.message);

    else
        console.error(err);

    return err;
  }


  
  
    
};