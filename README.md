# Chatbot

## Overview
This repository contains a chatbot application that takes an input query and a Kaggle dataset, processes the text into n-grams, calculates TF-IDF values, performs cosine similarity, and returns results. The chatbot consists of two main components: a frontend built with React and a backend implemented with FastAPI.

## Functionality
The chatbot works as follows:
1. Accepts an input query from the user.
2. Processes the query text into n-grams.
3. Calculates TF-IDF values for the n-grams.
4. Computes cosine similarity between the TF-IDF vectors of the query and the dataset.
5. Returns the result based on the highest cosine similarity score.

## Dataset
The chatbot uses a Kaggle dataset available at [Chatbot Dataset](https://www.kaggle.com/datasets/niraliivaghani/chatbot-dataset?resource=download). This dataset contains example queries and their corresponding responses, which are used for training and testing the chatbot.

## Repository Structure
- **frontend**: Contains the React application for the chatbot frontend.
- **backend**: Contains the FastAPI code for the chatbot backend, including API endpoints.

## Installation and Usage
1. Clone the repository:

```
git clone https://github.com/sri1873/Tf-Idf-Chatbot
cd chatbot
```

2. Install dependencies:
- For the frontend:
  ```
  cd frontend
  npm install
  ```
3. Run the backend FastAPI server:
   ```
   cd backend
   uvicorn main:app --reload
   ```
4. Run the frontend React app:
   ```
   npm start --reload
   ```
5. Access the chatbot application in your browser.

## Usage

- Open the chatbot in your web browser (typically at http://localhost:3000).
- Type your query into the chat window and press Enter.
- The chatbot will analyze your query using n-grams, TF-IDF, and cosine similarity to find the most relevant response from the dataset.

## Technologies Used
- React: Frontend framework for building user interfaces.
- FastAPI: Backend framework for building APIs with Python.
- TF-IDF: Term Frequency-Inverse Document Frequency for text analysis.
- Cosine Similarity: Measure of similarity between two non-zero vectors.

# Chatbot API Documentation

## Overview
This document provides information about the API endpoints available in the Chatbot application. The API is used to interact with the chatbot backend and perform queries.

## Base URL
The base URL for the API endpoints is `http://localhost:8000`.

## API Endpoints

### Get Chatbot Response
- **URL**: `/query`
- **Method**: `GET`
- **Description**: Retrieves a response from the chatbot based on the input query.
- **Query Parameters**:
  - `query` (string, required): The input query for which the chatbot response is requested.
- **Response**:
  - **Code**: `200 OK`
  - **Content Type**: `application/json`
  - **Body**: The response from the chatbot in JSON format.
- **Example**:
  ```bash
  curl -X 'GET' 'http://localhost:8000/query?query=What%20is%20your%20name' -H 'accept: application/json'
  ```

## Reference Images
  <img width="960" alt="image" src="https://github.com/sri1873/Tf-Idf-Chatbot/assets/86394512/b432b6ab-ab3e-4f03-a157-cb33109e82c6">
  <img width="960" alt="image" src="https://github.com/sri1873/Tf-Idf-Chatbot/assets/86394512/192b5fd0-8ba6-4b10-a5af-58d4d213538e">


