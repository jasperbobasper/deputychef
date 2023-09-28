import { Box, Typography } from "@mui/material";
import cowboy from "../assets/cowboy.png";
import { useEffect, useState } from "react";


const Cowboy = ({sx, name}) => {

    const greetings = [
        "Howdy there, buckaroo! Ready to rustle up some grub?",
        "Well, howdy-do! Ain't no meal-planning challenge too tough for us.",
        "Did you know? Wastin' food is like leavin' money on the table. Let's save some dough!",
        "What's cookin', good lookin'? Tell me, any special requests today?",
        "Giddy up! We're gonna turn them ingredients into a rootin'-tootin' feast.",
        "If you've got dietary needs, don't be shy. I'm all ears, partner.",
        "Ever tried a recipe from scratch? Let's saddle up and cook somethin' from the heart.",
        "Fancy a recipe of the day? Give me a holler, and I'll round up somethin' tasty.",
        "Remember, I'm not just a chef; I'm your trusty culinary sidekick. How can I assist you today?",
        `Yeehaw, ${name}! Let's wrangle up some delicious dishes together.`,
        `You're doin' great, ${name}! Keep on cookin' and reducin' that food waste.`,
        `Don't be shy, ${name}. If you've got a hankerin' for a certain cuisine, just let me know.`,
        `You're a rootin'-tootin' meal planner, ${name}! Keep up the good work.`,
        `Remember, ${name}, every meal you plan is one less wasted. You're making a difference.`,
        `I reckon you've got the best taste in recipes, ${name}. Let's whip up some magic together.`,
        `You're a real trailblazer in the kitchen, ${name}. Keep those culinary adventures rollin'.`,
        `Stay confident, ${name}! You're the sheriff of your kitchen, and I'm your trusty deputy.`,
        `You're an inspiration, ${name}. Keep cookin' and leadin' the way to a greener, tastier world.`,
        `Just remember, ${name}, every meal you plan is a step closer to a more sustainable future.`,
        `Howdy there, ${name}! Keep your chin up and your spurs jinglin'.`,
        `Well, slap me with a cactus, ${name}, you're lookin' mighty fine today!`,
        `Did you know, ${name}? Even the toughest cowboys need a smile now and then.`,
        `What's cookin', ${name}? I mean, besides some good ol' grub!`,
        `Giddy up, ${name}! Life's a rodeo, and you're in the saddle.`,
        `If you've got dreams, don't be shy, ${name}. Go chase 'em like a wild mustang.`,
        `Ever danced with a tumbleweed, ${name}? Life's a hootenanny; don't forget to enjoy it.`,
        `Just a reminder, ${name}, you're as unique as a two-headed rattlesnake. Embrace it!`,
        `Fancy a little yeehaw in your step, ${name}? Kick up some dust and have some fun.`,
        `Remember, ${name}, it ain't about the size of your hat; it's the size of your heart.`,
        `Yeehaw, ${name}! Time to saddle up and ride into the sunset of your dreams.`,
        `You're doin' great, ${name}! Keep on ridin' that trail of success.`,
        `Don't be shy, ${name}. If you've got a hankerin' for adventure, just saddle up and go!`,
        `You're a rootin'-tootin' dynamo, ${name}! Keep that cowboy spirit alive and well.`,
        `Remember, ${name}, even a tumbleweed finds its way eventually. You're no different.`,
        `I reckon you've got the grit and determination of a true cowboy, ${name}.`,
        `You're a real trailblazer, ${name}. Keep ridin' that trail to greatness.`,
        `Stay confident, ${name}! You've got the heart of a cowboy and the soul of a winner.`,
        `You're an inspiration, ${name}. Keep ridin' tall in the saddle of life.`,
        `Just remember, ${name}, even when the trail gets tough, you've got the spirit of a true cowboy to see you through.`
    ]

    const [speech, setSpeech] = useState(null);
    const [timer, setTimer] = useState(null);

    const handleClick = () => {
        if (timer) {
            clearTimeout(timer);
            setTimer(null);
        }
        
        const randomIndex = Math.floor(Math.random() * greetings.length);
        setSpeech(greetings[randomIndex]);
        setTimer(setTimeout(() => setSpeech(null), 10000));
    }

    useEffect(() => {
        handleClick();
    }, [])

    return (
        <Box sx={sx}>
            {speech && 
            <Box sx={{position: "absolute", top: "-40vh", bgcolor: "background.main", p:2, borderRadius: 5}}>
                <Typography variant="h6">{speech}</Typography>
            </Box>}
            <Box onClick={handleClick} tabIndex="0" component="div" className="rise-shake" style={{minWidth: "60%"}}>
                    <img src={cowboy} alt="Cute, simple cartoon cowboy riding a horse" style={{position: "absolute", bottom: "-20vh", width: "100%", height: "auto"}}/>
            </Box>
        </Box>
    )
}

export default Cowboy