-- Active: 1701249799872@@127.0.0.1@3306@pelitietokanta
-- Luo tietokanta, jos se ei ole jo olemassa
CREATE DATABASE IF NOT EXISTS pelitietokanta;

-- Valitse tietokantaa käytettäväksi
USE pelitietokanta;

-- Luo taulu kysymyksille
CREATE TABLE
    IF NOT EXISTS kysymykset (
        id INT AUTO_INCREMENT PRIMARY KEY,
        kysymysteksti VARCHAR(255) NOT NULL,
        vastaus VARCHAR(255) NOT NULL
    );

-- Lisää esimerkkikysymyksiä
INSERT INTO
    kysymykset (kysymysteksti, vastaus)
VALUES (
        'Mikä on Suomen pääkaupunki?',
        'Helsinki'
    ), ('Paljon on 2 + 2?', '4'), (
        'Mikä on suurin planeetta aurinkokunnassamme?',
        'Jupiter'
    );