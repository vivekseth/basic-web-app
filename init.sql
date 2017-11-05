PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE users (
   username TEXT PRIMARY KEY NOT NULL,
   hash TEXT NOT NULL
);
INSERT INTO "users" VALUES('vivek','$2a$10$cEpt5YcoQTL5bA1W.EKIBeZ/RbjymsLHXod0HSjy0w.NSJHFsKu1e');
INSERT INTO "users" VALUES('john','$2a$10$WYSw6pKiAJd.knvxinrxAeFgiZOweieRoTraWvWufVZUp6oc8Cyw6');
CREATE TABLE favorites (
   username TEXT NOT NULL,
   type TEXT NOT NULL,
   id TEXT NOT NULL,
   UNIQUE(username, type, id)
);
INSERT INTO "favorites" VALUES('john','film','1');
INSERT INTO "favorites" VALUES('john','character','1');
INSERT INTO "favorites" VALUES('john','character','2');
INSERT INTO "favorites" VALUES('john','character','3');
INSERT INTO "favorites" VALUES('john','film','3');
INSERT INTO "favorites" VALUES('john','film','2');
CREATE TABLE films (
  film_id INT PRIMARY KEY,
  title TEXT NOT NULL,
  episode_id INT,
  opening_crawl TEXT NOT NULL,
  director TEXT NOT NULL,
  producer TEXT NOT NULL,
  release_date TEXT NOT NULL
);
INSERT INTO "films" VALUES(1,'A New Hope',4,'It is a period of civil war.
Rebel spaceships, striking
from a hidden base, have won
their first victory against
the evil Galactic Empire.

During the battle, Rebel
spies managed to steal secret
plans to the Empire''s
ultimate weapon, the DEATH
STAR, an armored space
station with enough power
to destroy an entire planet.

Pursued by the Empire''s
sinister agents, Princess
Leia races home aboard her
starship, custodian of the
stolen plans that can save her
people and restore
freedom to the galaxy....','George Lucas','Gary Kurtz, Rick McCallum','1977-05-25');
INSERT INTO "films" VALUES(2,'The Empire Strikes Back',5,'It is a dark time for the
Rebellion. Although the Death
Star has been destroyed,
Imperial troops have driven the
Rebel forces from their hidden
base and pursued them across
the galaxy.

Evading the dreaded Imperial
Starfleet, a group of freedom
fighters led by Luke Skywalker
has established a new secret
base on the remote ice world
of Hoth.

The evil lord Darth Vader,
obsessed with finding young
Skywalker, has dispatched
thousands of remote probes into
the far reaches of space....','Irvin Kershner','Gary Kurtz, Rick McCallum','1980-05-17');
INSERT INTO "films" VALUES(3,'Return of the Jedi',6,'Luke Skywalker has returned to
his home planet of Tatooine in
an attempt to rescue his
friend Han Solo from the
clutches of the vile gangster
Jabba the Hutt.

Little does Luke know that the
GALACTIC EMPIRE has secretly
begun construction on a new
armored space station even
more powerful than the first
dreaded Death Star.

When completed, this ultimate
weapon will spell certain doom
for the small band of rebels
struggling to restore freedom
to the galaxy...','Richard Marquand','Howard G. Kazanjian, George Lucas, Rick McCallum','1983-05-25');
INSERT INTO "films" VALUES(4,'The Phantom Menace',1,'Turmoil has engulfed the
Galactic Republic. The taxation
of trade routes to outlying star
systems is in dispute.

Hoping to resolve the matter
with a blockade of deadly
battleships, the greedy Trade
Federation has stopped all
shipping to the small planet
of Naboo.

While the Congress of the
Republic endlessly debates
this alarming chain of events,
the Supreme Chancellor has
secretly dispatched two Jedi
Knights, the guardians of
peace and justice in the
galaxy, to settle the conflict....','George Lucas','Rick McCallum','1999-05-19');
INSERT INTO "films" VALUES(5,'Attack of the Clones',2,'There is unrest in the Galactic
Senate. Several thousand solar
systems have declared their
intentions to leave the Republic.

This separatist movement,
under the leadership of the
mysterious Count Dooku, has
made it difficult for the limited
number of Jedi Knights to maintain 
peace and order in the galaxy.

Senator Amidala, the former
Queen of Naboo, is returning
to the Galactic Senate to vote
on the critical issue of creating
an ARMY OF THE REPUBLIC
to assist the overwhelmed
Jedi....','George Lucas','Rick McCallum','2002-05-16');
INSERT INTO "films" VALUES(6,'Revenge of the Sith',3,'War! The Republic is crumbling
under attacks by the ruthless
Sith Lord, Count Dooku.
There are heroes on both sides.
Evil is everywhere.

In a stunning move, the
fiendish droid leader, General
Grievous, has swept into the
Republic capital and kidnapped
Chancellor Palpatine, leader of
the Galactic Senate.

As the Separatist Droid Army
attempts to flee the besieged
capital with their valuable
hostage, two Jedi Knights lead a
desperate mission to rescue the
captive Chancellor....','George Lucas','Rick McCallum','2005-05-19');
INSERT INTO "films" VALUES(7,'The Force Awakens',7,'Luke Skywalker has vanished.
In his absence, the sinister
FIRST ORDER has risen from
the ashes of the Empire
and will not rest until
Skywalker, the last Jedi,
has been destroyed.
 
With the support of the
REPUBLIC, General Leia Organa
leads a brave RESISTANCE.
She is desperate to find her
brother Luke and gain his
help in restoring peace and
justice to the galaxy.
 
Leia has sent her most daring
pilot on a secret mission
to Jakku, where an old ally
has discovered a clue to
Luke''s whereabouts....','J. J. Abrams','Kathleen Kennedy, J. J. Abrams, Bryan Burk','2015-12-11');
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
INSERT INTO "characters" VALUES(1,'Luke Skywalker',172.0,77.0,'blond','fair','blue','19BBY','male');
INSERT INTO "characters" VALUES(2,'C-3PO',167.0,75.0,'n/a','gold','yellow','112BBY','n/a');
INSERT INTO "characters" VALUES(3,'R2-D2',96.0,32.0,'n/a','white, blue','red','33BBY','n/a');
INSERT INTO "characters" VALUES(4,'Darth Vader',202.0,136.0,'none','white','yellow','41.9BBY','male');
INSERT INTO "characters" VALUES(5,'Leia Organa',150.0,49.0,'brown','light','brown','19BBY','female');
INSERT INTO "characters" VALUES(6,'Owen Lars',178.0,120.0,'brown, grey','light','blue','52BBY','male');
INSERT INTO "characters" VALUES(7,'Beru Whitesun lars',165.0,75.0,'brown','light','blue','47BBY','female');
INSERT INTO "characters" VALUES(8,'R5-D4',97.0,32.0,'n/a','white, red','red','unknown','n/a');
INSERT INTO "characters" VALUES(9,'Biggs Darklighter',183.0,84.0,'black','light','brown','24BBY','male');
INSERT INTO "characters" VALUES(10,'Obi-Wan Kenobi',182.0,77.0,'auburn, white','fair','blue-gray','57BBY','male');
INSERT INTO "characters" VALUES(11,'Anakin Skywalker',188.0,84.0,'blond','fair','blue','41.9BBY','male');
INSERT INTO "characters" VALUES(12,'Wilhuff Tarkin',180.0,'unknown','auburn, grey','fair','blue','64BBY','male');
INSERT INTO "characters" VALUES(13,'Chewbacca',228.0,112.0,'brown','unknown','blue','200BBY','male');
INSERT INTO "characters" VALUES(14,'Han Solo',180.0,80.0,'brown','fair','brown','29BBY','male');
INSERT INTO "characters" VALUES(15,'Greedo',173.0,74.0,'n/a','green','black','44BBY','male');
INSERT INTO "characters" VALUES(16,'Jabba Desilijic Tiure',175.0,'1,358','n/a','green-tan, brown','orange','600BBY','hermaphrodite');
INSERT INTO "characters" VALUES(18,'Wedge Antilles',170.0,77.0,'brown','fair','hazel','21BBY','male');
INSERT INTO "characters" VALUES(19,'Jek Tono Porkins',180.0,110.0,'brown','fair','blue','unknown','male');
INSERT INTO "characters" VALUES(20,'Yoda',66.0,17.0,'white','green','brown','896BBY','male');
INSERT INTO "characters" VALUES(21,'Palpatine',170.0,75.0,'grey','pale','yellow','82BBY','male');
INSERT INTO "characters" VALUES(22,'Boba Fett',183.0,78.2,'black','fair','brown','31.5BBY','male');
INSERT INTO "characters" VALUES(23,'IG-88',200.0,140.0,'none','metal','red','15BBY','none');
INSERT INTO "characters" VALUES(24,'Bossk',190.0,113.0,'none','green','red','53BBY','male');
INSERT INTO "characters" VALUES(25,'Lando Calrissian',177.0,79.0,'black','dark','brown','31BBY','male');
INSERT INTO "characters" VALUES(26,'Lobot',175.0,79.0,'none','light','blue','37BBY','male');
INSERT INTO "characters" VALUES(27,'Ackbar',180.0,83.0,'none','brown mottle','orange','41BBY','male');
INSERT INTO "characters" VALUES(28,'Mon Mothma',150.0,'unknown','auburn','fair','blue','48BBY','female');
INSERT INTO "characters" VALUES(29,'Arvel Crynyd','unknown','unknown','brown','fair','brown','unknown','male');
INSERT INTO "characters" VALUES(30,'Wicket Systri Warrick',88.0,20.0,'brown','brown','brown','8BBY','male');
INSERT INTO "characters" VALUES(31,'Nien Nunb',160.0,68.0,'none','grey','black','unknown','male');
INSERT INTO "characters" VALUES(32,'Qui-Gon Jinn',193.0,89.0,'brown','fair','blue','92BBY','male');
INSERT INTO "characters" VALUES(33,'Nute Gunray',191.0,90.0,'none','mottled green','red','unknown','male');
INSERT INTO "characters" VALUES(34,'Finis Valorum',170.0,'unknown','blond','fair','blue','91BBY','male');
INSERT INTO "characters" VALUES(35,'Padmé Amidala',165.0,45.0,'brown','light','brown','46BBY','female');
INSERT INTO "characters" VALUES(36,'Jar Jar Binks',196.0,66.0,'none','orange','orange','52BBY','male');
INSERT INTO "characters" VALUES(37,'Roos Tarpals',224.0,82.0,'none','grey','orange','unknown','male');
INSERT INTO "characters" VALUES(38,'Rugor Nass',206.0,'unknown','none','green','orange','unknown','male');
INSERT INTO "characters" VALUES(39,'Ric Olié',183.0,'unknown','brown','fair','blue','unknown','male');
INSERT INTO "characters" VALUES(40,'Watto',137.0,'unknown','black','blue, grey','yellow','unknown','male');
INSERT INTO "characters" VALUES(41,'Sebulba',112.0,40.0,'none','grey, red','orange','unknown','male');
INSERT INTO "characters" VALUES(42,'Quarsh Panaka',183.0,'unknown','black','dark','brown','62BBY','male');
INSERT INTO "characters" VALUES(43,'Shmi Skywalker',163.0,'unknown','black','fair','brown','72BBY','female');
INSERT INTO "characters" VALUES(44,'Darth Maul',175.0,80.0,'none','red','yellow','54BBY','male');
INSERT INTO "characters" VALUES(45,'Bib Fortuna',180.0,'unknown','none','pale','pink','unknown','male');
INSERT INTO "characters" VALUES(46,'Ayla Secura',178.0,55.0,'none','blue','hazel','48BBY','female');
INSERT INTO "characters" VALUES(47,'Ratts Tyerell',79.0,15.0,'none','grey, blue','unknown','unknown','male');
INSERT INTO "characters" VALUES(48,'Dud Bolt',94.0,45.0,'none','blue, grey','yellow','unknown','male');
INSERT INTO "characters" VALUES(49,'Gasgano',122.0,'unknown','none','white, blue','black','unknown','male');
INSERT INTO "characters" VALUES(50,'Ben Quadinaros',163.0,65.0,'none','grey, green, yellow','orange','unknown','male');
INSERT INTO "characters" VALUES(51,'Mace Windu',188.0,84.0,'none','dark','brown','72BBY','male');
INSERT INTO "characters" VALUES(52,'Ki-Adi-Mundi',198.0,82.0,'white','pale','yellow','92BBY','male');
INSERT INTO "characters" VALUES(53,'Kit Fisto',196.0,87.0,'none','green','black','unknown','male');
INSERT INTO "characters" VALUES(54,'Eeth Koth',171.0,'unknown','black','brown','brown','unknown','male');
INSERT INTO "characters" VALUES(55,'Adi Gallia',184.0,50.0,'none','dark','blue','unknown','female');
INSERT INTO "characters" VALUES(56,'Saesee Tiin',188.0,'unknown','none','pale','orange','unknown','male');
INSERT INTO "characters" VALUES(57,'Yarael Poof',264.0,'unknown','none','white','yellow','unknown','male');
INSERT INTO "characters" VALUES(58,'Plo Koon',188.0,80.0,'none','orange','black','22BBY','male');
INSERT INTO "characters" VALUES(59,'Mas Amedda',196.0,'unknown','none','blue','blue','unknown','male');
INSERT INTO "characters" VALUES(60,'Gregar Typho',185.0,85.0,'black','dark','brown','unknown','male');
INSERT INTO "characters" VALUES(61,'Cordé',157.0,'unknown','brown','light','brown','unknown','female');
INSERT INTO "characters" VALUES(62,'Cliegg Lars',183.0,'unknown','brown','fair','blue','82BBY','male');
INSERT INTO "characters" VALUES(63,'Poggle the Lesser',183.0,80.0,'none','green','yellow','unknown','male');
INSERT INTO "characters" VALUES(64,'Luminara Unduli',170.0,56.2,'black','yellow','blue','58BBY','female');
INSERT INTO "characters" VALUES(65,'Barriss Offee',166.0,50.0,'black','yellow','blue','40BBY','female');
INSERT INTO "characters" VALUES(66,'Dormé',165.0,'unknown','brown','light','brown','unknown','female');
INSERT INTO "characters" VALUES(67,'Dooku',193.0,80.0,'white','fair','brown','102BBY','male');
INSERT INTO "characters" VALUES(68,'Bail Prestor Organa',191.0,'unknown','black','tan','brown','67BBY','male');
INSERT INTO "characters" VALUES(69,'Jango Fett',183.0,79.0,'black','tan','brown','66BBY','male');
INSERT INTO "characters" VALUES(70,'Zam Wesell',168.0,55.0,'blonde','fair, green, yellow','yellow','unknown','female');
INSERT INTO "characters" VALUES(71,'Dexter Jettster',198.0,102.0,'none','brown','yellow','unknown','male');
INSERT INTO "characters" VALUES(72,'Lama Su',229.0,88.0,'none','grey','black','unknown','male');
INSERT INTO "characters" VALUES(73,'Taun We',213.0,'unknown','none','grey','black','unknown','female');
INSERT INTO "characters" VALUES(74,'Jocasta Nu',167.0,'unknown','white','fair','blue','unknown','female');
INSERT INTO "characters" VALUES(75,'R4-P17',96.0,'unknown','none','silver, red','red, blue','unknown','female');
INSERT INTO "characters" VALUES(76,'Wat Tambor',193.0,48.0,'none','green, grey','unknown','unknown','male');
INSERT INTO "characters" VALUES(77,'San Hill',191.0,'unknown','none','grey','gold','unknown','male');
INSERT INTO "characters" VALUES(78,'Shaak Ti',178.0,57.0,'none','red, blue, white','black','unknown','female');
INSERT INTO "characters" VALUES(79,'Grievous',216.0,159.0,'none','brown, white','green, yellow','unknown','male');
INSERT INTO "characters" VALUES(80,'Tarfful',234.0,136.0,'brown','brown','blue','unknown','male');
INSERT INTO "characters" VALUES(81,'Raymus Antilles',188.0,79.0,'brown','light','brown','unknown','male');
INSERT INTO "characters" VALUES(82,'Sly Moore',178.0,48.0,'none','pale','white','unknown','female');
INSERT INTO "characters" VALUES(83,'Tion Medon',206.0,80.0,'none','grey','black','unknown','male');
INSERT INTO "characters" VALUES(84,'Finn','unknown','unknown','black','dark','dark','unknown','male');
INSERT INTO "characters" VALUES(85,'Rey','unknown','unknown','brown','light','hazel','unknown','female');
INSERT INTO "characters" VALUES(86,'Poe Dameron','unknown','unknown','brown','light','brown','unknown','male');
INSERT INTO "characters" VALUES(87,'BB8','unknown','unknown','none','none','black','unknown','none');
INSERT INTO "characters" VALUES(88,'Captain Phasma','unknown','unknown','unknown','unknown','unknown','unknown','female');
CREATE TABLE film_characters (
  film_id INT,
  character_id INT,
  PRIMARY KEY (film_id, character_id)
);
INSERT INTO "film_characters" VALUES(1,1);
INSERT INTO "film_characters" VALUES(1,2);
INSERT INTO "film_characters" VALUES(1,3);
INSERT INTO "film_characters" VALUES(1,4);
INSERT INTO "film_characters" VALUES(1,5);
INSERT INTO "film_characters" VALUES(1,6);
INSERT INTO "film_characters" VALUES(1,7);
INSERT INTO "film_characters" VALUES(1,8);
INSERT INTO "film_characters" VALUES(1,9);
INSERT INTO "film_characters" VALUES(1,10);
INSERT INTO "film_characters" VALUES(1,12);
INSERT INTO "film_characters" VALUES(1,13);
INSERT INTO "film_characters" VALUES(1,14);
INSERT INTO "film_characters" VALUES(1,15);
INSERT INTO "film_characters" VALUES(1,16);
INSERT INTO "film_characters" VALUES(1,18);
INSERT INTO "film_characters" VALUES(1,19);
INSERT INTO "film_characters" VALUES(1,81);
INSERT INTO "film_characters" VALUES(2,1);
INSERT INTO "film_characters" VALUES(2,2);
INSERT INTO "film_characters" VALUES(2,3);
INSERT INTO "film_characters" VALUES(2,4);
INSERT INTO "film_characters" VALUES(2,5);
INSERT INTO "film_characters" VALUES(2,10);
INSERT INTO "film_characters" VALUES(2,13);
INSERT INTO "film_characters" VALUES(2,14);
INSERT INTO "film_characters" VALUES(2,18);
INSERT INTO "film_characters" VALUES(2,20);
INSERT INTO "film_characters" VALUES(2,21);
INSERT INTO "film_characters" VALUES(2,22);
INSERT INTO "film_characters" VALUES(2,23);
INSERT INTO "film_characters" VALUES(2,24);
INSERT INTO "film_characters" VALUES(2,25);
INSERT INTO "film_characters" VALUES(2,26);
INSERT INTO "film_characters" VALUES(3,1);
INSERT INTO "film_characters" VALUES(3,2);
INSERT INTO "film_characters" VALUES(3,3);
INSERT INTO "film_characters" VALUES(3,4);
INSERT INTO "film_characters" VALUES(3,5);
INSERT INTO "film_characters" VALUES(3,10);
INSERT INTO "film_characters" VALUES(3,13);
INSERT INTO "film_characters" VALUES(3,14);
INSERT INTO "film_characters" VALUES(3,16);
INSERT INTO "film_characters" VALUES(3,18);
INSERT INTO "film_characters" VALUES(3,20);
INSERT INTO "film_characters" VALUES(3,21);
INSERT INTO "film_characters" VALUES(3,22);
INSERT INTO "film_characters" VALUES(3,25);
INSERT INTO "film_characters" VALUES(3,27);
INSERT INTO "film_characters" VALUES(3,28);
INSERT INTO "film_characters" VALUES(3,29);
INSERT INTO "film_characters" VALUES(3,30);
INSERT INTO "film_characters" VALUES(3,31);
INSERT INTO "film_characters" VALUES(3,45);
INSERT INTO "film_characters" VALUES(4,2);
INSERT INTO "film_characters" VALUES(4,3);
INSERT INTO "film_characters" VALUES(4,10);
INSERT INTO "film_characters" VALUES(4,11);
INSERT INTO "film_characters" VALUES(4,16);
INSERT INTO "film_characters" VALUES(4,20);
INSERT INTO "film_characters" VALUES(4,21);
INSERT INTO "film_characters" VALUES(4,32);
INSERT INTO "film_characters" VALUES(4,33);
INSERT INTO "film_characters" VALUES(4,34);
INSERT INTO "film_characters" VALUES(4,36);
INSERT INTO "film_characters" VALUES(4,37);
INSERT INTO "film_characters" VALUES(4,38);
INSERT INTO "film_characters" VALUES(4,39);
INSERT INTO "film_characters" VALUES(4,40);
INSERT INTO "film_characters" VALUES(4,41);
INSERT INTO "film_characters" VALUES(4,42);
INSERT INTO "film_characters" VALUES(4,43);
INSERT INTO "film_characters" VALUES(4,44);
INSERT INTO "film_characters" VALUES(4,46);
INSERT INTO "film_characters" VALUES(4,48);
INSERT INTO "film_characters" VALUES(4,49);
INSERT INTO "film_characters" VALUES(4,50);
INSERT INTO "film_characters" VALUES(4,51);
INSERT INTO "film_characters" VALUES(4,52);
INSERT INTO "film_characters" VALUES(4,53);
INSERT INTO "film_characters" VALUES(4,54);
INSERT INTO "film_characters" VALUES(4,55);
INSERT INTO "film_characters" VALUES(4,56);
INSERT INTO "film_characters" VALUES(4,57);
INSERT INTO "film_characters" VALUES(4,58);
INSERT INTO "film_characters" VALUES(4,59);
INSERT INTO "film_characters" VALUES(4,47);
INSERT INTO "film_characters" VALUES(4,35);
INSERT INTO "film_characters" VALUES(5,2);
INSERT INTO "film_characters" VALUES(5,3);
INSERT INTO "film_characters" VALUES(5,6);
INSERT INTO "film_characters" VALUES(5,7);
INSERT INTO "film_characters" VALUES(5,10);
INSERT INTO "film_characters" VALUES(5,11);
INSERT INTO "film_characters" VALUES(5,20);
INSERT INTO "film_characters" VALUES(5,21);
INSERT INTO "film_characters" VALUES(5,22);
INSERT INTO "film_characters" VALUES(5,33);
INSERT INTO "film_characters" VALUES(5,36);
INSERT INTO "film_characters" VALUES(5,40);
INSERT INTO "film_characters" VALUES(5,43);
INSERT INTO "film_characters" VALUES(5,46);
INSERT INTO "film_characters" VALUES(5,51);
INSERT INTO "film_characters" VALUES(5,52);
INSERT INTO "film_characters" VALUES(5,53);
INSERT INTO "film_characters" VALUES(5,58);
INSERT INTO "film_characters" VALUES(5,59);
INSERT INTO "film_characters" VALUES(5,60);
INSERT INTO "film_characters" VALUES(5,61);
INSERT INTO "film_characters" VALUES(5,62);
INSERT INTO "film_characters" VALUES(5,63);
INSERT INTO "film_characters" VALUES(5,64);
INSERT INTO "film_characters" VALUES(5,65);
INSERT INTO "film_characters" VALUES(5,66);
INSERT INTO "film_characters" VALUES(5,67);
INSERT INTO "film_characters" VALUES(5,68);
INSERT INTO "film_characters" VALUES(5,69);
INSERT INTO "film_characters" VALUES(5,70);
INSERT INTO "film_characters" VALUES(5,71);
INSERT INTO "film_characters" VALUES(5,72);
INSERT INTO "film_characters" VALUES(5,73);
INSERT INTO "film_characters" VALUES(5,74);
INSERT INTO "film_characters" VALUES(5,75);
INSERT INTO "film_characters" VALUES(5,76);
INSERT INTO "film_characters" VALUES(5,77);
INSERT INTO "film_characters" VALUES(5,78);
INSERT INTO "film_characters" VALUES(5,82);
INSERT INTO "film_characters" VALUES(5,35);
INSERT INTO "film_characters" VALUES(6,1);
INSERT INTO "film_characters" VALUES(6,2);
INSERT INTO "film_characters" VALUES(6,3);
INSERT INTO "film_characters" VALUES(6,4);
INSERT INTO "film_characters" VALUES(6,5);
INSERT INTO "film_characters" VALUES(6,6);
INSERT INTO "film_characters" VALUES(6,7);
INSERT INTO "film_characters" VALUES(6,10);
INSERT INTO "film_characters" VALUES(6,11);
INSERT INTO "film_characters" VALUES(6,12);
INSERT INTO "film_characters" VALUES(6,13);
INSERT INTO "film_characters" VALUES(6,20);
INSERT INTO "film_characters" VALUES(6,21);
INSERT INTO "film_characters" VALUES(6,33);
INSERT INTO "film_characters" VALUES(6,46);
INSERT INTO "film_characters" VALUES(6,51);
INSERT INTO "film_characters" VALUES(6,52);
INSERT INTO "film_characters" VALUES(6,53);
INSERT INTO "film_characters" VALUES(6,54);
INSERT INTO "film_characters" VALUES(6,55);
INSERT INTO "film_characters" VALUES(6,56);
INSERT INTO "film_characters" VALUES(6,58);
INSERT INTO "film_characters" VALUES(6,63);
INSERT INTO "film_characters" VALUES(6,64);
INSERT INTO "film_characters" VALUES(6,67);
INSERT INTO "film_characters" VALUES(6,68);
INSERT INTO "film_characters" VALUES(6,75);
INSERT INTO "film_characters" VALUES(6,78);
INSERT INTO "film_characters" VALUES(6,79);
INSERT INTO "film_characters" VALUES(6,80);
INSERT INTO "film_characters" VALUES(6,81);
INSERT INTO "film_characters" VALUES(6,82);
INSERT INTO "film_characters" VALUES(6,83);
INSERT INTO "film_characters" VALUES(6,35);
INSERT INTO "film_characters" VALUES(7,1);
INSERT INTO "film_characters" VALUES(7,3);
INSERT INTO "film_characters" VALUES(7,5);
INSERT INTO "film_characters" VALUES(7,13);
INSERT INTO "film_characters" VALUES(7,14);
INSERT INTO "film_characters" VALUES(7,27);
INSERT INTO "film_characters" VALUES(7,84);
INSERT INTO "film_characters" VALUES(7,85);
INSERT INTO "film_characters" VALUES(7,86);
INSERT INTO "film_characters" VALUES(7,87);
INSERT INTO "film_characters" VALUES(7,88);
COMMIT;
