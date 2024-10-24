import json
import os
import google.generativeai as genai
import requests
import boto3
import random
from datetime import datetime

ACCESS_ID = os.environ["ACCESS_ID"]
ACCESS_KEY = os.environ["ACCESS_KEY"]

genai.configure(api_key=os.environ["GENAIAPI"])
dynamodb = boto3.resource('dynamodb', region_name='eu-west-1', aws_access_key_id=ACCESS_ID, aws_secret_access_key= ACCESS_KEY)
table = dynamodb.Table('PerspectivePixel')

def generate_answer():
    generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 64,
    "max_output_tokens": 8192,
    "response_mime_type": "application/json",
    }

    model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
    )

    question = requests.get("http://3.255.213.246:3000/api/question").json()["question"]

    chat_session = model.start_chat(
    history=[
        {
        "role": "user",
        "parts": [
            "write 30 answers to this question: What’s one thing that always makes you smile?, each answer should be from a different location on earth, answer the question from their perspective and give their latitude and longitude",
        ],
        },
        {
        "role": "model",
        "parts": [
            "```json\n[{\"answer\": \"Seeing the Northern Lights dance across the sky, a silent symphony of emerald and purple.\", \"latitude\": \"69.6887\", \"longitude\": \"-138.4364\"}, {\"answer\": \"The smell of freshly baked focaccia bread wafting from the local bakery, a comforting aroma that fills the air with warmth.\", \"latitude\": \"43.7696\", \"longitude\": \"11.2558\"}, {\"answer\": \"Watching the sunrise over the ancient temples of Angkor Wat, a breathtaking spectacle of golden light bathing the stone.\", \"latitude\": \"13.4125\", \"longitude\": \"103.8667\"}, {\"answer\": \"The rhythmic sound of the waves crashing against the white sand beaches of Bora Bora, a soothing melody that calms the soul.\", \"latitude\": \"-16.5500\", \"longitude\": \"-151.7422\"}, {\"answer\": \"The vibrant colors of the Rio Carnival, a kaleidoscope of costumes, music, and laughter that fills the streets with joy.\", \"latitude\": \"-22.9068\", \"longitude\": \"-43.1729\"}, {\"answer\": \"The thrill of a good climb up the snow-capped peaks of the Himalayas, a challenge that rewards with breathtaking views.\", \"latitude\": \"28.0028\", \"longitude\": \"84.1240\"}, {\"answer\": \"The peaceful serenity of a silent meditation session at the Golden Temple in Amritsar, a moment of inner peace amidst the bustling city.\", \"latitude\": \"31.6340\", \"longitude\": \"74.8723\"}, {\"answer\": \"The vibrant street art that adorns the walls of Wynwood, a testament to the creativity and energy of Miami.\", \"latitude\": \"25.7932\", \"longitude\": \"-80.2028\"}, {\"answer\": \"The gentle sway of the rice paddies in the Vietnamese countryside, a calming sight that evokes a sense of peace.\", \"latitude\": \"16.0479\", \"longitude\": \"108.2209\"}, {\"answer\": \"The warm hospitality of the people of the Galapagos Islands, a reminder of the kindness and generosity of humanity.\", \"latitude\": \"-0.9100\", \"longitude\": \"-90.7000\"}, {\"answer\": \"The vibrant street food scene in Bangkok, a culinary adventure that tantalizes the taste buds with exotic flavors.\", \"latitude\": \"13.7522\", \"longitude\": \"100.5232\"}, {\"answer\": \"The breathtaking beauty of the Grand Canyon, a testament to the power and grandeur of nature.\", \"latitude\": \"36.1069\", \"longitude\": \"-112.1130\"}, {\"answer\": \"The soothing sound of the geysers erupting in Iceland, a natural spectacle that reminds us of the power of the Earth.\", \"latitude\": \"64.9631\", \"longitude\": \"-19.0208\"}, {\"answer\": \"The thrill of riding a camel through the Sahara Desert, a unique experience that transports you to another world.\", \"latitude\": \"23.3525\", \"longitude\": \"1.2194\"}, {\"answer\": \"The sound of the bells ringing in the ancient city of Kyoto, a harmonious chime that echoes through the centuries.\", \"latitude\": \"35.0116\", \"longitude\": \"135.7681\"}, {\"answer\": \"The feeling of the cool breeze blowing across the rolling hills of Tuscany, a refreshing sensation that invigorates the senses.\", \"latitude\": \"43.4321\", \"longitude\": \"11.0145\"}, {\"answer\": \"The sight of penguins waddling across the frozen landscape of Antarctica, a reminder of the beauty and diversity of life on Earth.\", \"latitude\": \"-90.0000\", \"longitude\": \"0.0000\"}, {\"answer\": \"The smell of fresh coffee brewing in the bustling streets of Istanbul, a comforting aroma that invigorates the senses.\", \"latitude\": \"41.0082\", \"longitude\": \"28.9784\"}, {\"answer\": \"The colorful display of cherry blossoms in full bloom in Japan, a delicate and ephemeral beauty that marks the arrival of spring.\", \"latitude\": \"35.6895\", \"longitude\": \"139.6917\"}, {\"answer\": \"The magnificent architecture of the Taj Mahal, a testament to the power of love and beauty.\", \"latitude\": \"27.1751\", \"longitude\": \"78.0421\"}, {\"answer\": \"The sound of the didgeridoo echoing across the Australian outback, a haunting melody that connects us to ancient traditions.\", \"latitude\": \"-25.2744\", \"longitude\": \"133.7751\"}, {\"answer\": \"The vibrant colors of the traditional costumes worn by the Maasai people in Kenya, a symbol of their rich culture and heritage.\", \"latitude\": \"-1.2833\", \"longitude\": \"36.8167\"}, {\"answer\": \"The breathtaking views from the top of Table Mountain, a majestic peak that overlooks the vibrant city of Cape Town.\", \"latitude\": \"-33.9620\", \"longitude\": \"18.4241\"}, {\"answer\": \"The smell of freshly baked bread in a Parisian bakery, a classic Parisian experience that evokes a sense of nostalgia.\", \"latitude\": \"48.8566\", \"longitude\": \"2.3522\"}, {\"answer\": \"The sight of the Great Wall of China stretching across the vast landscape, a testament to human ingenuity and perseverance.\", \"latitude\": \"40.4319\", \"longitude\": \"116.5704\"}, {\"answer\": \"The sound of the samba music echoing through the streets of Salvador, a lively and infectious rhythm that fills the air with joy.\", \"latitude\": \"-12.9728\", \"longitude\": \"-38.5034\"}, {\"answer\": \"The feeling of the cool water splashing on my face as I swim in the crystal clear waters of the Caribbean Sea, a refreshing and invigorating experience.\", \"latitude\": \"18.2208\", \"longitude\": \"-66.5901\"}, {\"answer\": \"The sight of the vast expanse of the Amazon rainforest, a reminder of the beauty and resilience of nature.\", \"latitude\": \"-3.7342\", \"longitude\": \"-60.0218\"}, {\"answer\": \"The feeling of the sand between my toes as I walk along the pristine beaches of the Maldives, a moment of pure bliss and relaxation.\", \"latitude\": \"3.2028\", \"longitude\": \"73.2207\"}]\n\n```",
        ],
        },
    ]
    )

    response = chat_session.send_message(f"write 30 answers to this question: {question}, each answer should be from a different location on earth, answer the question from their perspective and give their latitude and longitude")
    data = json.loads(response.text)
    return data




def add_to_db(data):
    # Add an entry to your DynamoDB table
    table.put_item(
        Item={
            'id':str(random.randint(1, 1000000)),
            'latitude': data['latitude'],
            'longitude': data['longitude'],
            'text': data['answer'],
            'timestamp': datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S.%f')[:-3] + 'Z'
        }
    )



if __name__ == '__main__':
    data = generate_answer()
    for line in data:
        add_to_db(line)
    print('done')
