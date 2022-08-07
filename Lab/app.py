from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import random
import json

app = Flask(__name__, static_folder = 'static', template_folder = 'templates')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
CORS(app)

# ===============================================================================

wordlist = ["LAPTOP", "CUP", "APPLE", "GOOGLE", "WATERMELON", "PAPER", "LEXUS"]

# ------------------------FUNCTIONS------------------------
def count(myList):
	result = 0
	for i in range(len(myList)):
		if myList[i] != " ":
			result = result + 1
	return result

def findMostFrequentWord(myList):
	word_counter = {}
	for word in myList:
		if len(word) > 0 and word != "":
			if word not in word_counter:
				word_counter[word] = 1
			else:
				word_counter[word] += 1
	
	fwc = sorted(word_counter.items(), key = lambda word: word[1])
	word1 = fwc[-1]
	word2 = fwc[-2]
	word3 = fwc[-3]
	word4 = fwc[-4]
	word5 = fwc[-5]

	return (word1[0], word2[0], word3[0], word4[0], word5[0])

def findLongest(myList):
	longest = ""
	for i in range(len(myList)):
		if len(myList[i]) > len(longest):
			longest = myList[i]
	return longest

def findShortest(myList):
	shortest = myList[0]

	for i in range(len(myList)):
		if myList[i] != "":
			if len(myList[i]) < len(shortest):
				shortest = myList[i]

	return shortest

def bookInfo(someText):
	someText = someText.replace('\n', ' ')
	someText = someText.replace('--', ' ')
	someText = someText.replace('-', ' ')
	someText = someText.replace('_', ' ')
	someText = someText.replace('.', ' ')
	someText = someText.replace('?', ' ')
	someText = someText.replace('(', ' ')
	someText = someText.replace(')', ' ')
	someText = someText.replace('[', ' ')
	someText = someText.replace(']', ' ')

	items = someText.split(' ')

	numberOfWords = count(items)
	
	longestWord = findLongest(items)
	
	shortestWord = findShortest(items)

	mostFrequentWord = findMostFrequentWord(items)

	return {"wordCount": numberOfWords, "longestWord": longestWord, "shortestWord": shortestWord, "mostFrequentWords": mostFrequentWord}

	
# ------------------------PAGES------------------------
# Render Home Page
@app.route('/')
def home():
    return render_template('index.html')

# Render Hobbies Page
@app.route('/hobbies')
def about():
    return render_template('hobbies.html')

# Render Secret Page
@app.route('/secret')
def secret():
    return render_template('secret.html')

@app.route('/game')
def game():
    return render_template('game.html')

# Render Book Page
@app.route('/book')
def book():
	return render_template('book.html')

# Render Address Book Page
@app.route('/addressbook')
def address_book():
	return render_template('addressbook.html')

# ------------------------ENDPOINTS------------------------
# Check Secret Log In Page
@app.route('/verify')
def verify():
	username = request.args.get("username")
	password = request.args.get("password")

	f = open('login.txt', 'r')
	lines = f.readlines()
	f.close()

	for i in range(len(lines)):
		lines[i] = lines[i].strip()
		if lines[i] != "": 
			temp = json.loads(lines[i])
			if username == temp['user'] and password == temp['pass']:
				return "Correct"
	return "Incorrect"

# Register Accounts for Secret and Address Book
@app.route('/accounts')
def accounts():
	username = request.args.get("username")
	password = request.args.get("password")

	f = open('login.txt', 'r')
	lines = f.readlines()
	f.close()

	for i in range(len(lines)):
		lines[i] = lines[i].strip()
		if lines[i] != "": 
			temp = json.loads(lines[i])
			if username == temp['user']:
				return "Incorrect"

	sign_up = {"user": username, "pass": password}

	string_sign_up = json.dumps(sign_up)

	f = open('login.txt', 'a')
	f.writelines(['\n', string_sign_up])
	f.close()

	return "Correct"

# Save New Contact
@app.route('/newcontact')
def newcontact():
	first_name = request.args.get("first_name")
	last_name = request.args.get("last_name")
	address = request.args.get("address")
	city = request.args.get("city")
	state = request.args.get("state")
	zip_code = request.args.get("zip_code")
	phone_1 = request.args.get("phone_1")
	phone_2 = request.args.get("phone_2")
	email = request.args.get("email")

	string_contact = f"{first_name},{last_name},{address},{city},{state},{zip_code},{phone_1},{phone_2},{email}"

	new = open('contacts.csv', 'a+')
	new.writelines(['\n', string_contact])

	return "yes"

# List of Contact Info
@app.route('/complete_list')
def contact_func():
	f = open('contacts.csv', 'r')

	contact_data = f.readlines()

	f.close()

	for i in range(len(contact_data)):
		contact_data[i] = contact_data[i].strip()

	contact_info = []

	for i in range(len(contact_data)):
		row = contact_data[i]
		if row != "":
			items = row.split(',')
			first_name = items[0]
			last_name = items[1]
			address = items[2]
			city = items[3]
			state = items[4]
			zip_code = items[5]
			phone_1 = items[6]
			phone_2 = items[7]
			email = items[8]

			contact_row = {'first_name': first_name, 'last_name': last_name, 'address': address, 'city': city, 'state': state, 'zip_code': zip_code, 'phone_1': phone_1, 'phone_2': phone_2, 'email': email}
			contact_info.append(contact_row)

	return {'complete_list': contact_info}

# Search Code
@app.route('/search')
def search_func():
	query = request.args.get("q")

	result = []

	for i in range(len(contact_info)):
		if query.upper() == contact_info[i]['first_name'].upper()[:len(query)]:
			result.append(contact_info[i])

	for i in range(len(contact_info)):
		if query.upper() == contact_info[i]['last_name'].upper()[:len(query)]:
			result.append(contact_info[i])
	
	for i in range(len(contact_info)):
		if query.upper() == contact_info[i]['address'].upper()[:len(query)]:
			result.append(contact_info[i])

	for i in range(len(contact_info)):
		if query.upper() == contact_info[i]['city'].upper()[:len(query)]:
			result.append(contact_info[i])
	
	for i in range(len(contact_info)):
		if query.upper() == contact_info[i]['state'].upper()[:len(query)]:
			result.append(contact_info[i])

	for i in range(len(contact_info)):
		if query.upper() == contact_info[i]['zip_code'].upper()[:len(query)]:
			result.append(contact_info[i])
	
	for i in range(len(contact_info)):
		if query.upper() == contact_info[i]['phone_1'].upper()[:len(query)]:
			result.append(contact_info[i])

	for i in range(len(contact_info)):
		if query.upper() == contact_info[i]['phone_2'].upper()[:len(query)]:
			result.append(contact_info[i])
	
	for i in range(len(contact_info)):
		if query.upper() == contact_info[i]['email'].upper()[:len(query)]:
			result.append(contact_info[i])

	return {'result': result}

# Book Code 
@app.route('/getbook')
def getBook():
	f = open('HIW.txt', 'r')
	temp = f.read()
	f.close()
	return temp

@app.route('/bookinfo')
def book_info():
	f = open('HIW.txt', 'r')
	book = f.read()
	f.close()

	stats = bookInfo(book)
	return {"stats": stats}

# Comments Code
@app.route('/savecomment')
def save():
	name = request.args.get('name')
	message = request.args.get('message')

	comment = {"name": name, "message": message}

	string_comment = json.dumps(comment)

	f = open('comments.txt', 'a')
	f.writelines(['\n', string_comment])
	f.close()
	return "", 201

@app.route('/getcomments')
def getComments():
	f = open('comments.txt', 'r')
	lines = f.readlines()
	f.close()

	comments = []

	for i in range(len(lines)):
		lines[i] = lines[i].strip()
		if lines[i] != "":
			temp = json.loads(lines[i])
			comments.append(temp)

	return {"comments": comments}

# Game Code
@app.route('/getword')
def getword():
	pos = random.randint(0, len(wordlist)-1)
	return {'length': len(wordlist[pos]), 'position': pos}

@app.route('/check_attempt')
def check_attempt():
	letter = request.args.get('letter')
	positions = []
	index = int(request.args.get("index"))
	word = wordlist[index]
	for i in range(len(word)):
		if word[i] == letter:
			positions.append(i)
	
	print(positions)
	return {'letterReturn': letter, 'positionsReturn': positions}

# ===============================================================================
if __name__ == '__main__':
        app.run(debug=True, host="0.0.0.0", port=9000)
