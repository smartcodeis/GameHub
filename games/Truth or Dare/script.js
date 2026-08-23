const truthCards = [
    {
        text: "What is the most embarrassing thing that has ever happened to you?",
        category: "embarrassing"
    },
    {
        text: "What is your biggest secret?",
        category: "personal"
    },
    {
        text: "What is the weirdest thing you have ever done alone?",
        category: "funny"
    },
    {
        text: "Who was your first crush?",
        category: "relationship"
    },
    {
        text: "What is one thing you regret doing?",
        category: "deep"
    },
    {
        text: "What is the funniest lie you have ever told?",
        category: "funny"
    },
    {
        text: "What is something you are afraid to tell people?",
        category: "deep"
    },
    {
        text: "Have you ever had a crush on a friend?",
        category: "relationship"
    },
    {
        text: "What is the most childish thing you still do?",
        category: "funny"
    },
    {
        text: "What is one thing you would change about yourself?",
        category: "personal"
    },
    {
        text: "What is the most awkward message you have ever sent?",
        category: "embarrassing"
    },
    {
        text: "Who knows you better than anyone else?",
        category: "personal"
    },
    {
        text: "What is your biggest fear?",
        category: "deep"
    },
    {
        text: "Have you ever lied to get out of trouble?",
        category: "personal"
    },
    {
        text: "What is the weirdest search you have made online?",
        category: "funny"
    },
    {
        text: "What is something you have done that you hope your parents never find out about?",
        category: "personal"
    },
    {
        text: "What is the biggest lie you have told someone close to you?",
        category: "deep"
    },
    {
        text: "Have you ever pretended to like someone just to get something from them?",
        category: "personal"
    },
    {
        text: "What is the worst decision you have ever made?",
        category: "deep"
    },
    {
        text: "Who is the last person you stalked on social media?",
        category: "funny"
    },
    {
        text: "Have you ever read someone's messages without their permission?",
        category: "personal"
    },
    {
        text: "What is something you have never told your best friend?",
        category: "deep"
    },
    {
        text: "Have you ever liked someone who was already in a relationship?",
        category: "relationship"
    },
    {
        text: "What is the biggest red flag you have ignored in someone?",
        category: "relationship"
    },
    {
        text: "Have you ever lied about where you were?",
        category: "personal"
    },
    {
        text: "What is the most jealous you have ever been?",
        category: "relationship"
    },
    {
        text: "Have you ever had feelings for someone you shouldn't have?",
        category: "relationship"
    },
    {
        text: "What is the most embarrassing thing in your search history?",
        category: "embarrassing"
    },
    {
        text: "Have you ever sent a message and immediately regretted it?",
        category: "embarrassing"
    },
    {
        text: "What is something you judge people for but secretly do yourself?",
        category: "deep"
    },
    {
        text: "What is the most childish reason you have ever been angry?",
        category: "funny"
    },
    {
        text: "Have you ever pretended not to see someone's message?",
        category: "funny"
    },
    {
        text: "What is the worst excuse you have used to cancel plans?",
        category: "funny"
    },
    {
        text: "Who was the last person you had a crush on?",
        category: "relationship"
    },
    {
        text: "Have you ever fallen for someone who didn't feel the same way?",
        category: "relationship"
    },
    {
        text: "What is the biggest mistake you made in a relationship?",
        category: "relationship"
    },
    {
        text: "Have you ever gone back to someone you knew was bad for you?",
        category: "relationship"
    },
    {
        text: "What is something you wish you could say to someone but never will?",
        category: "deep"
    },
    {
        text: "What is one thing about yourself that you are insecure about?",
        category: "personal"
    },
    {
        text: "What is your biggest insecurity when it comes to relationships?",
        category: "relationship"
    },
    {
        text: "Have you ever lied because you were afraid someone would leave you?",
        category: "deep"
    },
    {
        text: "What is the closest you have ever come to getting caught doing something you shouldn't?",
        category: "embarrassing"
    },
    {
        text: "Have you ever blamed someone else for something that was actually your fault?",
        category: "personal"
    },
    {
        text: "What is something you would never forgive someone for?",
        category: "deep"
    },
    {
        text: "Have you ever secretly disliked one of your friends?",
        category: "personal"
    },
    {
        text: "What is the meanest thing you have ever said to someone?",
        category: "deep"
    },
    {
        text: "Have you ever broken someone's heart?",
        category: "relationship"
    },
    {
        text: "What is one secret you are currently keeping?",
        category: "personal"
    },
    {
        text: "Have you ever lied during a game of Truth or Dare?",
        category: "funny"
    },
    {
        text: "What is the most awkward date you have ever been on?",
        category: "embarrassing"
    },
    {
        text: "Have you ever had a crush on someone in this room?",
        category: "relationship"
    },
    {
        text: "What is the most toxic thing you have done out of jealousy?",
        category: "relationship"
    },
    {
        text: "Have you ever checked if someone was online just to see if they were ignoring you?",
        category: "relationship"
    },
    {
        text: "What is something you would change about your last relationship?",
        category: "relationship"
    },
    {
        text: "Have you ever regretted breaking up with someone?",
        category: "relationship"
    },
    {
        text: "What is the biggest compliment you have ever received?",
        category: "personal"
    },
    {
        text: "What is something you secretly want people to notice about you?",
        category: "personal"
    },
    {
        text: "Have you ever lied to your friends about having plans because you didn't want to see them?",
        category: "funny"
    },
    {
        text: "What is the most awkward thing you have done in front of your crush?",
        category: "embarrassing"
    },
    {
        text: "Have you ever accidentally liked an old photo while stalking someone?",
        category: "embarrassing"
    },
    {
        text: "What is one opinion you have that most people around you would disagree with?",
        category: "deep"
    },
    {
        text: "What is something you would do differently if nobody could judge you?",
        category: "deep"
    },
    {
        text: "What is the biggest risk you have ever taken?",
        category: "deep"
    },
    {
        text: "Who is someone you wish you could talk to again?",
        category: "deep"
    },
    { text: "Have you ever had feelings for someone and pretended you didn't?", category: "relationship" },
    { text: "What is the first thing you notice when you are attracted to someone?", category: "relationship" },
    { text: "Have you ever been jealous of one of your friends?", category: "personal" },
    { text: "What is something you wish you could undo?", category: "deep" },
    { text: "Have you ever ignored someone because you wanted their attention?", category: "relationship" },
    { text: "What is the biggest misunderstanding someone has about you?", category: "personal" },
    { text: "Have you ever pretended to be busy to avoid someone?", category: "personal" },
    { text: "What is the most embarrassing nickname you have ever had?", category: "embarrassing" },
    { text: "Have you ever had a crush on someone your friend liked?", category: "relationship" },
    { text: "What is something you would never admit to your parents?", category: "personal" },
    { text: "Have you ever lied because you didn't want to hurt someone's feelings?", category: "deep" },
    { text: "What is the worst first impression you have ever made?", category: "embarrassing" },
    { text: "Have you ever regretted trusting someone?", category: "deep" },
    { text: "What is the longest you have stayed angry at someone?", category: "personal" },
    { text: "Have you ever secretly hoped two people would break up?", category: "relationship" },
    { text: "What is something you are extremely competitive about?", category: "personal" },
    { text: "Have you ever lied about liking a gift?", category: "funny" },
    { text: "What is the dumbest argument you have ever had?", category: "funny" },
    { text: "Have you ever practiced a conversation before having it?", category: "funny" },
    { text: "What is the most awkward conversation you have ever had?", category: "embarrassing" },
    { text: "Have you ever accidentally sent something to the wrong person?", category: "embarrassing" },
    { text: "What is the worst excuse you have ever believed?", category: "funny" },
    { text: "Have you ever pretended to understand something when you didn't?", category: "funny" },
    { text: "What is the weirdest habit you have that nobody knows about?", category: "funny" },
    { text: "Have you ever laughed at a completely inappropriate moment?", category: "embarrassing" },
    { text: "What is the most embarrassing thing you have done because of a crush?", category: "embarrassing" },
    { text: "Have you ever deleted a message because you were scared of the reply?", category: "relationship" },
    { text: "What is the longest you have stalked someone's social media?", category: "funny" },
    { text: "Have you ever checked someone's profile repeatedly hoping they would notice?", category: "relationship" },
    { text: "What is the biggest sign that you have a crush on someone?", category: "relationship" },
    { text: "Have you ever fallen for someone you knew was completely wrong for you?", category: "relationship" },
    { text: "What is the biggest lesson a past relationship taught you?", category: "deep" },
    { text: "Have you ever stayed in a relationship longer than you should have?", category: "relationship" },
    { text: "What is one thing you need to improve about yourself?", category: "deep" },
    { text: "What is something you pretend doesn't bother you but actually does?", category: "deep" },
    { text: "Have you ever compared yourself to your friends?", category: "personal" },
    { text: "What is your biggest insecurity that you rarely talk about?", category: "deep" },
    { text: "What is something you are afraid people will discover about you?", category: "deep" },
    { text: "Have you ever felt like you were not good enough for someone?", category: "deep" },
    { text: "What is something you wish people understood about you?", category: "deep" },
    { text: "Who is the person you trust the most?", category: "personal" },
    { text: "Who would you call first if you were in serious trouble?", category: "personal" },
    { text: "What is one friendship you regret losing?", category: "deep" },
    { text: "Have you ever stopped talking to someone without telling them why?", category: "personal" },
    { text: "What is the hardest goodbye you have ever experienced?", category: "deep" },
    { text: "Have you ever missed someone you knew was bad for you?", category: "relationship" },
    { text: "What is something you still think about from years ago?", category: "deep" },
    { text: "What is one thing you wish you had done differently last year?", category: "deep" },
    { text: "What is the biggest risk you regret not taking?", category: "deep" },
    { text: "Have you ever sabotaged something because you were afraid of failing?", category: "deep" },
    { text: "What is something you are pretending to be okay with?", category: "deep" },
    { text: "Have you ever lied about being okay?", category: "deep" },
    { text: "What is one thing you wish you could say to your younger self?", category: "deep" },
    { text: "What is something you wish you could change about your past?", category: "deep" },
    { text: "Have you ever judged someone and later realized you were wrong?", category: "deep" },
    { text: "What is the most selfish thing you have ever done?", category: "personal" },
    { text: "Have you ever used someone's secret against them?", category: "personal" },
    { text: "What is the worst thing you have done out of anger?", category: "personal" },
    { text: "Have you ever held a grudge for no good reason?", category: "personal" },
    { text: "What is something you would never tolerate in a friendship?", category: "personal" },
    { text: "Have you ever lied to your best friend?", category: "personal" },
    { text: "What is the biggest secret you have kept for someone else?", category: "personal" },
    { text: "Have you ever betrayed someone's trust?", category: "deep" },
    { text: "What is something you wish you had the courage to do?", category: "deep" },
    { text: "Have you ever been caught doing something embarrassing?", category: "embarrassing" },
    { text: "What is the most awkward thing you have said while nervous?", category: "embarrassing" },
    { text: "Have you ever called someone by the wrong name at the worst possible moment?", category: "embarrassing" },
    { text: "What is your most embarrassing autocorrect mistake?", category: "embarrassing" },
    { text: "Have you ever waved back at someone who wasn't waving at you?", category: "embarrassing" },
    { text: "What is the most embarrassing thing you have done in public?", category: "embarrassing" },
    { text: "Have you ever pretended not to know someone in public?", category: "personal" },
    { text: "What is the strangest rumor you have ever heard about yourself?", category: "funny" },
    { text: "Have you ever lied about your age?", category: "personal" },
    { text: "What is the weirdest thing you have ever believed as a child?", category: "funny" },
    { text: "Have you ever had a completely irrational fear?", category: "funny" },
    { text: "What is the weirdest thing you have ever done because you were bored?", category: "funny" },
    { text: "Have you ever talked to yourself out loud when nobody was around?", category: "funny" },
    { text: "What is the strangest thing you have ever searched online?", category: "funny" }
];

const dareCards = [
    {
        text: "Do your best dance for 20 seconds.",
        difficulty: "easy"
    },
    {
        text: "Talk in a funny voice for the next 2 minutes.",
        difficulty: "easy"
    },
    {
        text: "Act like your favorite celebrity.",
        difficulty: "easy"
    },
    {
        text: "Sing the first song that comes to your mind.",
        difficulty: "easy"
    },
    {
        text: "Do 10 jumping jacks.",
        difficulty: "easy"
    },
    {
        text: "Let another player choose your profile picture for 5 minutes.",
        difficulty: "medium"
    },
    {
        text: "Tell a joke without laughing.",
        difficulty: "medium"
    },
    {
        text: "Imitate another player until they guess who you are.",
        difficulty: "medium"
    },
    {
        text: "Speak only using questions for the next 2 minutes.",
        difficulty: "medium"
    },
    {
        text: "Do your best impression of someone in the room.",
        difficulty: "medium"
    },
    {
        text: "Dance without music for one full minute.",
        difficulty: "hard"
    },
    {
        text: "Let the group choose a silly nickname for you for the rest of the game.",
        difficulty: "hard"
    },
    {
        text: "Perform a dramatic movie scene chosen by the group.",
        difficulty: "hard"
    },
    {
        text: "Try to make everyone laugh in 30 seconds.",
        difficulty: "hard"
    },
    {
        text: "Give a completely improvised speech about a random object.",
        difficulty: "extreme"
    },
    {
        text: "Let another player choose one photo from your gallery for everyone to see.",
        difficulty: "medium"
    },
    {
        text: "Send 'I need to tell you something...' to the last person you texted, then wait 2 minutes before explaining.",
        difficulty: "medium"
    },
    {
        text: "Call someone and keep the conversation going for 30 seconds without saying why you called.",
        difficulty: "medium"
    },
    {
        text: "Let the group choose one person from your contacts and send them a harmless emoji.",
        difficulty: "medium"
    },
    {
        text: "Read your last three sent messages out loud.",
        difficulty: "easy"
    },
    {
        text: "Show the group your last five Google searches.",
        difficulty: "medium"
    },
    {
        text: "Let another player write your next Instagram or WhatsApp status.",
        difficulty: "hard"
    },
    {
        text: "Give your phone to another player and let them choose one harmless photo to show the group.",
        difficulty: "hard"
    },
    {
        text: "Text your best friend: 'Be honest, what is my biggest red flag?'",
        difficulty: "medium"
    },
    {
        text: "Call a friend and ask them to describe you in three words.",
        difficulty: "easy"
    },
    {
        text: "Let another player choose your profile picture for the next 10 minutes.",
        difficulty: "medium"
    },
    {
        text: "Show the last photo you took with your phone.",
        difficulty: "easy"
    },
    {
        text: "Read your last search history item out loud.",
        difficulty: "easy"
    },
    {
        text: "Send a voice message saying 'We need to talk' to a friend, then immediately say it's a joke.",
        difficulty: "medium"
    },
    {
        text: "Let the group ask you one question that you must answer honestly.",
        difficulty: "medium"
    },
    {
        text: "Give a 30-second speech explaining why you are the best person in the room.",
        difficulty: "medium"
    },
    {
        text: "Imitate the person sitting closest to you until they guess who you are.",
        difficulty: "medium"
    },
    {
        text: "Tell a completely believable fake story about yourself and make the group guess if it's true.",
        difficulty: "hard"
    },
    {
        text: "Let another player choose a word you cannot say for the next 5 minutes.",
        difficulty: "medium"
    },
    {
        text: "Speak with an accent chosen by the group for the next 3 minutes.",
        difficulty: "medium"
    },
    {
        text: "Let the group choose one embarrassing but harmless story for you to tell.",
        difficulty: "hard"
    },
    {
        text: "Recreate your most awkward moment using only acting and no words.",
        difficulty: "hard"
    },
    {
        text: "Make eye contact with another player for 60 seconds without laughing.",
        difficulty: "hard"
    },
    {
        text: "Let another player ask you three rapid-fire questions and answer immediately.",
        difficulty: "medium"
    },
    {
        text: "Act like you are on a first date with the person chosen by the group for 2 minutes.",
        difficulty: "hard"
    },
    {
        text: "Pretend to be angry about something completely ridiculous for one minute.",
        difficulty: "easy"
    },
    {
        text: "Give someone in the room a brutally honest but respectful compliment.",
        difficulty: "medium"
    },
    {
        text: "Tell the group your most embarrassing story without leaving out the important details.",
        difficulty: "hard"
    },
    {
        text: "Let the group choose a question you must answer honestly.",
        difficulty: "hard"
    },
    {
        text: "Recreate your first interaction with your crush using another player.",
        difficulty: "hard"
    },
    {
        text: "Send a voice note to a friend saying the first random sentence the group gives you.",
        difficulty: "medium"
    },
    {
        text: "Let another player choose one harmless sentence for you to post on your status for 5 minutes.",
        difficulty: "hard"
    },
    {
        text: "Try to make the person across from you laugh without touching them.",
        difficulty: "medium"
    },
    {
        text: "Tell the group what your first impression was of every player.",
        difficulty: "hard"
    },
    {
        text: "Choose one player and explain what you like most about their personality.",
        difficulty: "medium"
    },
    {
        text: "Choose one player and give them your most honest first impression of them.",
        difficulty: "hard"
    },
    {
        text: "Pretend you are being interviewed about your worst date ever.",
        difficulty: "medium"
    },
    {
        text: "Act out how you behave when you have a crush on someone.",
        difficulty: "hard"
    },
    {
        text: "Let the group pick a random object and convince everyone it is the greatest invention ever.",
        difficulty: "medium"
    },
    {
        text: "Tell a story from your life while another player interrupts you with random words.",
        difficulty: "hard"
    },
    {
        text: "For the next 3 minutes, you must answer every question honestly.",
        difficulty: "hard"
    },
    {
        text: "Let another player choose one harmless challenge for you.",
        difficulty: "hard"
    },
    {
        text: "Recreate a scene from a famous movie with another player.",
        difficulty: "medium"
    },
    {
        text: "Pretend to confess your love to an object in the room for 30 seconds.",
        difficulty: "medium"
    },
    {
        text: "Describe your ideal partner without mentioning appearance.",
        difficulty: "medium"
    },
    {
        text: "Tell everyone the last time you were genuinely embarrassed.",
        difficulty: "medium"
    },
    {
        text: "Give a dramatic breakup speech to a random object.",
        difficulty: "medium"
    },
    {
        text: "Let the group decide whether you have to answer a truth question or perform another dare.",
        difficulty: "hard"
    },
    { text: "Show the group the last photo you saved on your phone.", difficulty: "easy" },
    { text: "Read the last message you received out loud.", difficulty: "easy" },
    { text: "Let another player choose one question you must answer honestly.", difficulty: "medium" },
    { text: "Tell the group your first impression of the person sitting next to you.", difficulty: "medium" },
    { text: "Tell the group your first impression of every player.", difficulty: "hard" },
    { text: "Choose one player and tell them something you genuinely admire about them.", difficulty: "medium" },
    { text: "Choose one player and tell them one harmless thing they should improve.", difficulty: "hard" },
    { text: "Let another player read the last message you sent, without showing the screen.", difficulty: "medium" },
    { text: "Call a friend and ask them what your biggest red flag is.", difficulty: "medium" },
    { text: "Call a friend and ask them what your best quality is.", difficulty: "easy" },
    { text: "Send a voice message saying whatever sentence the group chooses.", difficulty: "medium" },
    { text: "Let the group choose a harmless question and send it to a friend.", difficulty: "medium" },
    { text: "Show the group your most recent selfie.", difficulty: "easy" },
    { text: "Show the group the oldest photo you still have on your phone.", difficulty: "medium" },
    { text: "Read your last three Google searches without explaining them.", difficulty: "medium" },
    { text: "Let another player pick a random emoji and send it to your most recent contact.", difficulty: "medium" },
    { text: "Tell the group the last time you had a crush on someone.", difficulty: "hard" },
    { text: "Describe your ideal date without using the words 'restaurant' or 'movie'.", difficulty: "medium" },
    { text: "Act out how you behave when you see someone you have a crush on.", difficulty: "hard" },
    { text: "Pretend to be on a first date with another player for one minute.", difficulty: "hard" },
    { text: "Give another player a completely serious marriage proposal.", difficulty: "medium" },
    { text: "Give another player a dramatic breakup speech.", difficulty: "medium" },
    { text: "Flirt with a random object in the room for 30 seconds.", difficulty: "medium" },
    { text: "Give your best pickup line to the person chosen by the group.", difficulty: "medium" },
    { text: "Make up a ridiculous dating profile for yourself and read it aloud.", difficulty: "medium" },
    { text: "Describe your perfect partner using only five words.", difficulty: "easy" },
    { text: "Let the group decide which player would be your best match.", difficulty: "hard" },
    { text: "Rank the players from most likely to become famous to least likely.", difficulty: "hard" },
    { text: "Rank the players from most likely to get married first to least likely.", difficulty: "hard" },
    { text: "Tell everyone who you think would survive longest in a zombie apocalypse.", difficulty: "easy" },
    { text: "Tell everyone who you think would be the worst roommate.", difficulty: "medium" },
    { text: "Tell everyone who you think would be the best partner.", difficulty: "medium" },
    { text: "Tell the group one secret about yourself that is safe to share.", difficulty: "medium" },
    { text: "Tell an embarrassing story that you normally avoid telling.", difficulty: "hard" },
    { text: "Tell the story of your worst date as dramatically as possible.", difficulty: "hard" },
    { text: "Reenact your most embarrassing moment without speaking.", difficulty: "hard" },
    { text: "Act like you just received the worst news of your life for 30 seconds.", difficulty: "medium" },
    { text: "Act like you just won the lottery and explain what you would do.", difficulty: "easy" },
    { text: "Give a fake acceptance speech for an award you just won.", difficulty: "easy" },
    { text: "Convince everyone that a completely useless object is actually essential for survival.", difficulty: "medium" },
    { text: "Tell a fake story about yourself and make it believable enough that people doubt it.", difficulty: "hard" },
    { text: "Let another player ask you five questions that you must answer immediately.", difficulty: "hard" },
    { text: "For the next five minutes, you cannot lie if someone asks you a direct question.", difficulty: "hard" },
    { text: "Let the group choose one harmless thing you have to reveal about yourself.", difficulty: "hard" },
    { text: "Tell the person on your right what you honestly thought of them when you first met.", difficulty: "hard" },
    { text: "Tell the person on your left one thing you think they are really good at.", difficulty: "medium" },
    { text: "Give everyone in the room a compliment without repeating yourself.", difficulty: "medium" },
    { text: "Make another player laugh while keeping a completely serious face.", difficulty: "medium" },
    { text: "Stare at another player for 45 seconds without laughing or looking away.", difficulty: "hard" },
    { text: "Have a serious argument with another player about a completely ridiculous topic.", difficulty: "medium" },
    { text: "Pretend to be angry because someone ate the last slice of pizza.", difficulty: "easy" },
    { text: "Pretend you are being interviewed after making the biggest mistake of your life.", difficulty: "medium" },
    { text: "Give a one-minute motivational speech about something completely useless.", difficulty: "medium" },
    { text: "Make up a conspiracy theory about something in the room.", difficulty: "medium" },
    { text: "Explain your daily routine as if you are a celebrity being interviewed.", difficulty: "easy" },
    { text: "Act like another player and let everyone guess who you are.", difficulty: "medium" },
    { text: "Let the group choose a word you cannot say for the next 10 minutes.", difficulty: "hard" },
    { text: "Answer the next five questions with complete honesty.", difficulty: "hard" },
    { text: "Choose someone and tell them something you have always wanted to say to them.", difficulty: "hard" },
    { text: "Let another player choose your next dare.", difficulty: "hard" },
    { text: "Tell everyone one thing you would change about your personality.", difficulty: "medium" },
    { text: "Tell everyone one thing you are secretly proud of.", difficulty: "medium" },
    { text: "Tell the group about a time you completely embarrassed yourself.", difficulty: "medium" },
    { text: "Recreate the way you act when you are trying to impress someone.", difficulty: "hard" },
    { text: "Pretend you are trying to convince your crush to go on a date with you.", difficulty: "hard" },
    { text: "Give your best impression of how you act when you are jealous.", difficulty: "hard" },
    { text: "Let another player choose one harmless photo from your gallery to show everyone.", difficulty: "hard" },
    { text: "Show the group the last meme you saved.", difficulty: "easy" },
    { text: "Show the group the last screenshot you took.", difficulty: "medium" },
    { text: "Let the group choose a random word and make a romantic speech using it.", difficulty: "medium" },
    { text: "Give a dramatic speech about why you deserve to be the leader of the group.", difficulty: "medium" },
    { text: "Make everyone believe you have a completely ridiculous hidden talent.", difficulty: "hard" },
    { text: "Tell a story from your life using only three sentences.", difficulty: "medium" }
];

let mode = "truth";

let usedTruth = JSON.parse(localStorage.getItem('truthOrDare_usedTruth')) || [];
let usedDare = JSON.parse(localStorage.getItem('truthOrDare_usedDare')) || [];

let history = JSON.parse(localStorage.getItem('truthOrDare_history')) || [];

const modeButtons = document.querySelectorAll(".mode-btn");

const categoryGroup = document.getElementById("categoryGroup");
const difficultyGroup = document.getElementById("difficultyGroup");

const categorySelect = document.getElementById("category");
const difficultySelect = document.getElementById("difficulty");

const card = document.getElementById("card");
const cardIcon = document.getElementById("cardIcon");
const cardType = document.getElementById("cardType");
const question = document.getElementById("question");

const cardCategory = document.getElementById("cardCategory");
const cardDifficulty = document.getElementById("cardDifficulty");

const drawBtn = document.getElementById("drawBtn");

const remaining = document.getElementById("remaining");
const used = document.getElementById("used");

const historyList = document.getElementById("historyList");

const clearHistoryBtn = document.getElementById("clearHistory");
const resetBtn = document.getElementById("resetBtn");


/* =========================
   MODE SWITCH
========================= */

modeButtons.forEach(button => {

    button.addEventListener("click", () => {

        mode = button.dataset.mode;

        modeButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Change filters
        if (mode === "truth") {

            categoryGroup.classList.remove("hidden");
            difficultyGroup.classList.add("hidden");

        } else {

            categoryGroup.classList.add("hidden");
            difficultyGroup.classList.remove("hidden");
        }

        // Reset current card display
        resetCardDisplay();

        updateStats();
    });

});


/* =========================
   DRAW / NEXT
========================= */

drawBtn.addEventListener("click", handleDrawButton);

function handleDrawButton() {

    if (getRemainingCards() === 0) {

        if (mode === "truth") {
            usedTruth = [];
            localStorage.setItem('truthOrDare_usedTruth', JSON.stringify(usedTruth));
        } else {
            usedDare = [];
            localStorage.setItem('truthOrDare_usedDare', JSON.stringify(usedDare));
        }

        resetCardDisplay();
        updateStats();

        return;
    }

    drawCard();
}

function drawCard() {

    // Prevent drawing if no cards remain
    if (getRemainingCards() === 0) {
        showFinished(mode);
        return;
    }

    card.classList.remove("flip");

    // Restart animation
    void card.offsetWidth;

    card.classList.add("flip");

    setTimeout(() => {

        if (mode === "truth") {
            drawTruth();
        } else {
            drawDare();
        }

    }, 250);
}


/* =========================
   TRUTH
========================= */

function drawTruth() {

    const selectedCategory = categorySelect.value;

    const available = truthCards.filter((item, index) => {

        const categoryMatch =
            selectedCategory === "all" ||
            item.category === selectedCategory;

        const notUsed =
            !usedTruth.includes(index);

        return categoryMatch && notUsed;

    });

    if (available.length === 0) {
        showFinished("truth");
        return;
    }

    const randomItem =
        available[Math.floor(Math.random() * available.length)];

    const originalIndex =
        truthCards.indexOf(randomItem);

    // Mark as used
    usedTruth.push(originalIndex);
    localStorage.setItem('truthOrDare_usedTruth', JSON.stringify(usedTruth));

    cardIcon.textContent = "🤔";
    cardType.textContent = "TRUTH";

    question.textContent = randomItem.text;

    cardCategory.textContent =
        "Category: " + capitalize(randomItem.category);

    cardDifficulty.textContent = "";

    addHistory(
        "TRUTH",
        randomItem.text,
        randomItem.category
    );

    updateStats();
}


/* =========================
   DARE
========================= */

function drawDare() {

    const selectedDifficulty = difficultySelect.value;

    const available = dareCards.filter((item, index) => {

        const difficultyMatch =
            selectedDifficulty === "all" ||
            item.difficulty === selectedDifficulty;

        const notUsed =
            !usedDare.includes(index);

        return difficultyMatch && notUsed;

    });

    if (available.length === 0) {
        showFinished("dare");
        return;
    }

    const randomItem =
        available[Math.floor(Math.random() * available.length)];

    const originalIndex =
        dareCards.indexOf(randomItem);

    // Mark as used
    usedDare.push(originalIndex);
    localStorage.setItem('truthOrDare_usedDare', JSON.stringify(usedDare));

    cardIcon.textContent = "😈";
    cardType.textContent = "DARE";

    question.textContent = randomItem.text;

    cardCategory.textContent = "";

    cardDifficulty.textContent =
        "Difficulty: " + capitalize(randomItem.difficulty);

    addHistory(
        "DARE",
        randomItem.text,
        randomItem.difficulty
    );

    updateStats();
}


/* =========================
   FINISHED
========================= */

function showFinished(type) {

    cardIcon.textContent =
        type === "truth" ? "🤔" : "😈";

    cardType.textContent = "FINISHED";

    question.textContent =
        `You've used all available ${type} cards for this filter!`;

    cardCategory.textContent = "";
    cardDifficulty.textContent = "";

    drawBtn.textContent = "🔄 Start Again";

    updateStats();
}


/* =========================
   HISTORY
========================= */

function addHistory(type, text, info) {

    history.unshift({
        type,
        text,
        info,
        time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })
    });

    localStorage.setItem('truthOrDare_history', JSON.stringify(history));

    renderHistory();
}


function renderHistory() {

    if (history.length === 0) {

        historyList.innerHTML =
            `<p class="empty">No cards used yet.</p>`;

        return;
    }


    historyList.innerHTML = history.map(item => {

        return `
            <div class="history-item">

                <strong>${item.type}</strong>

                <br>

                ${escapeHTML(item.text)}

                <br>

                <small>
                    ${capitalize(item.info)} • ${item.time}
                </small>

            </div>
        `;

    }).join("");
}


/* =========================
   STATS
========================= */

function updateStats() {

    let total;
    let usedCount;

    if (mode === "truth") {

        const selectedCategory = categorySelect.value;

        total = truthCards.filter(item =>
            selectedCategory === "all" ||
            item.category === selectedCategory
        ).length;

        usedCount = truthCards.filter((item, index) => {

            return (
                usedTruth.includes(index) &&
                (
                    selectedCategory === "all" ||
                    item.category === selectedCategory
                )
            );

        }).length;

    } else {

        const selectedDifficulty = difficultySelect.value;

        total = dareCards.filter(item =>
            selectedDifficulty === "all" ||
            item.difficulty === selectedDifficulty
        ).length;

        usedCount = dareCards.filter((item, index) => {

            return (
                usedDare.includes(index) &&
                (
                    selectedDifficulty === "all" ||
                    item.difficulty === selectedDifficulty
                )
            );

        }).length;
    }

    remaining.textContent = total - usedCount;
    used.textContent = usedCount;
}


/* =========================
   FILTER CHANGE
========================= */

categorySelect.addEventListener("change", () => {
    resetCardDisplay();
    updateStats();
});

difficultySelect.addEventListener("change", () => {
    resetCardDisplay();
    updateStats();
});


/* =========================
   CLEAR HISTORY
========================= */

clearHistoryBtn.addEventListener("click", () => {

    history = [];
    localStorage.setItem('truthOrDare_history', JSON.stringify(history));

    renderHistory();
});


/* =========================
   RESET GAME
========================= */

resetBtn.addEventListener("click", () => {

    usedTruth = [];
    usedDare = [];

    history = [];

    localStorage.removeItem('truthOrDare_usedTruth');
    localStorage.removeItem('truthOrDare_usedDare');
    localStorage.removeItem('truthOrDare_history');

    question.textContent =
        "Choose Truth or Dare to start!";

    cardCategory.textContent = "Ready";
    cardDifficulty.textContent = "";

    renderHistory();
    updateStats();

});


/* =========================
   HELPERS
========================= */

function capitalize(text) {

    return text.charAt(0).toUpperCase() +
        text.slice(1);
}


function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}

/* =========================
   CARD DISPLAY
========================= */

function resetCardDisplay() {

    cardIcon.textContent =
        mode === "truth" ? "🤔" : "😈";

    cardType.textContent =
        mode === "truth" ? "TRUTH" : "DARE";

    question.textContent =
        "Press Next to get a card!";

    cardCategory.textContent = "Ready";
    cardDifficulty.textContent = "";

    drawBtn.textContent = "🎲 Next";
    drawBtn.classList.remove("hidden");
}


/* =========================
   GET REMAINING CARDS
========================= */

function getRemainingCards() {

    if (mode === "truth") {

        const selectedCategory = categorySelect.value;

        return truthCards.filter((item, index) => {

            const categoryMatch =
                selectedCategory === "all" ||
                item.category === selectedCategory;

            const notUsed =
                !usedTruth.includes(index);

            return categoryMatch && notUsed;

        }).length;

    }

    const selectedDifficulty = difficultySelect.value;

    return dareCards.filter((item, index) => {

        const difficultyMatch =
            selectedDifficulty === "all" ||
            item.difficulty === selectedDifficulty;

        const notUsed =
            !usedDare.includes(index);

        return difficultyMatch && notUsed;

    }).length;
}


/* =========================
   INIT
========================= */

updateStats();
renderHistory();