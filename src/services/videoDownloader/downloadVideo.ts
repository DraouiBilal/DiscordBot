import { ChannelType, ChatInputCommandInteraction } from "discord.js";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import ytdl from "ytdl-core";

export const downloadVideo = async (interaction: ChatInputCommandInteraction,url: string, mediaType: string, outputDir: string) => {

    try {
        const videoInfo = await ytdl.getInfo(url);
        const videoName = videoInfo.videoDetails.title+mediaType;


        if(!existsSync(outputDir)) {
            console.log("test") ; 
            mkdirSync(outputDir);
        }
        const writeStream = createWriteStream(outputDir+"/"+videoName);

        const dataStream = mediaType==".mp4" ? 
        ytdl.downloadFromInfo(videoInfo) : 
        ytdl.downloadFromInfo(videoInfo,{ format: ytdl.chooseFormat(videoInfo.formats, { quality: "highestaudio" })});

        dataStream.pipe(writeStream);

        writeStream.on("finish",async () => {
            let channel = interaction.guild?.channels.cache.find(channel => channel.name === "video-downloads");
            if(!(channel && channel.type === ChannelType.GuildText)){
                channel = await interaction.guild?.channels.create({name:"video-downloads",type: ChannelType.GuildText});
                
            }
            channel?.send({files: [{attachment: outputDir+"/"+videoName,name: videoName,description: "Your video"}]});
        
        });

    }
    catch (err: unknown){

        if(err instanceof Error)
            console.error(err.message);

        else
            console.error(err);

        return err;
    }
    

};