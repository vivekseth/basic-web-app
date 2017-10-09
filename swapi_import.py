import sqlite3
import requests

def get_url_id(url):
    return int(url.split('/')[-2])

def insert_film(cursor, film_id):
    url = 'https://swapi.co/api/films/'+str(film_id)+'/'
    response = requests.get(url)
    data = response.json()
    params = [
      film_id,
      data['title'],
      data['episode_id'],
      data['opening_crawl'],
      data['director'],
      data['producer'],
      data['release_date']
    ]

    sql_str = '''
    INSERT INTO 
      films (film_id, title, episode_id, opening_crawl, director, producer, release_date) 
    VALUES 
      (?, ?, ?, ?, ?, ?, ?);
    '''

    try:
        cursor.execute(sql_str, params)
    except Exception as e:
        print 'insert_film', film_id, e

    try:
        film_char_params = map(lambda url: (film_id, get_url_id(url)), data['characters'])
        cursor.executemany('INSERT INTO film_characters (film_id, character_id) VALUES (?, ?)', film_char_params);
    except Exception as e:
        print 'insert_film_characters', film_id, e

    print 'DONE film', film_id



def insert_character(cursor, character_id):
    url = 'https://swapi.co/api/people/'+str(character_id)+'/'
    response = requests.get(url)
    data = response.json()
    params = [
      character_id,
      data['name'],
      data['height'],
      data['mass'],
      data['hair_color'],
      data['skin_color'],
      data['eye_color'],
      data['birth_year'],
      data['gender']
    ]

    sql_str = '''
    INSERT INTO 
      characters (character_id, name, height, mass, hair_color, skin_color, eye_color, birth_year, gender) 
    VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?);
    '''

    try:
        cursor.execute(sql_str, params)
    except Exception as e:
        print 'insert_character', character_id, e

    print 'DONE character', character_id

connection = sqlite3.connect('database.db');
cursor = connection.cursor()

for i in range(1, 8):
   insert_film(cursor, i)

for i in range(0, 90):
    try:
        insert_character(cursor, i)
    except Exception as e:
        print 'likely invalid index', i, e

connection.commit()
connection.close()

'''

CREATE TABLE characters (
  character_id INT PRIMARY KEY,
  name TEXT NOT NULL,
  height REAL,
  mass REAL,
  hair_color TEXT NOT NULL,
  skin_color TEXT NOT NULL,
  eye_color TEXT NOT NULL,
  birth_year TEXT NOT NULL,
  gender TEXT NOT NULL
);

'''