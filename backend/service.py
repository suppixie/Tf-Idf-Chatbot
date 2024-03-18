import re
import json
import numpy as np
import google.generativeai as genai


def load_dataset(filename):
    with open(filename, 'r') as file:
        data = json.load(file)
    return data

# Preprocessing: Tokenization and normalization
def preprocess(text):
    text = text.lower()
    tokens = re.findall(r'\b\w+\b', text)  # simple word tokenization
    return tokens

# TF-IDF Implementation
def compute_tf_idf(docs):
    # Simple count for TF
    tf = {}
    df = {}
    for doc in docs:
        tf[doc] = {}
        for word in set(docs[doc]):
            # Term frequency
            tf[doc][word] = docs[doc].count(word)
            # Document frequency
            df[word] = df.get(word, 0) + 1

    # Compute TF-IDF
    tf_idf = {}
    N = len(docs)
    for doc in docs:
        tf_idf[doc] = {}
        for word in tf[doc]:
            tf_idf[doc][word] = tf[doc][word] * np.log(N / df[word])
    return tf_idf

# Cosine Similarity
def cosine_similarity(vec1, vec2):
    intersection = set(vec1.keys()) & set(vec2.keys())
    numerator = sum([vec1[x] * vec2[x] for x in intersection])
    
    sum1 = sum([vec1[x]**2 for x in vec1.keys()])
    sum2 = sum([vec2[x]**2 for x in vec2.keys()])
    denominator = np.sqrt(sum1) * np.sqrt(sum2)
    
    if not denominator:
        return 0.0
    else:
        return float(numerator) / denominator


# Main function to run the chatbot
def chatbot_response(query, intents_data, tf_idf):
    # Preprocess query
    processed_query = preprocess(query)
    
    # Compute query TF-IDF (simplified)
    query_tf_idf = {}
    for word in set(processed_query):
        query_tf_idf[word] = processed_query.count(word)

    # Find the most similar intent
    max_similarity = 0
    best_intent = None
    for intent in intents_data:
        intent_tag = intent['tag']
        if intent_tag in tf_idf:  # Ensure the intent has been processed in TF-IDF
            similarity = cosine_similarity(tf_idf[intent_tag], query_tf_idf)
            if similarity > max_similarity:
                max_similarity = similarity
                best_intent = intent_tag
    
    # Fetch response
    if best_intent:
        for intent in intents_data:
            if intent['tag'] == best_intent:
                return np.random.choice(intent['responses'])
    else:
        return "I'm not sure how to respond to that."


def fetch_results(query):
    
    # Load data
    filename = "C://Users//Srikumar//OneDrive//Desktop//New folder//Tf-Idf-Chatbot//backend//intents.json"
    data = load_dataset(filename)

    # Preprocess documents
    docs = {}
    for intent in data['intents']:
        combined_patterns = ' '.join(intent['patterns'])  # Combine all patterns into one document
        docs[intent['tag']] = preprocess(combined_patterns)  # Store processed document by intent's tag

    # Compute TF-IDF

    tf_idf = compute_tf_idf(docs)

    # Example query through user input
    response = chatbot_response(query, data['intents'], tf_idf)
    print(response)
    return response

def fetch_results_gpt(query):  
    genai.configure(api_key="ADDyourkey")

    # Set up the model
    generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 1000,
    }

    safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },    
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    ]

    model = genai.GenerativeModel(model_name="gemini-1.0-pro",
                                generation_config=generation_config,
                                safety_settings=safety_settings)

    convo = model.start_chat(history=[
    ])

    convo.send_message("Query:"+query + "Only Answer in the context of woxsen university or else refuse to answer.")
    return(convo.last.text)
