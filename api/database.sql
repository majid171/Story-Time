CREATE DATABASE storytime;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    user_email varchar(255) NOT NULL,
    user_password varchar(255) NOT NULL,
    created_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendship(
    user_id uuid NOT NULL,
    friend_id uuid NOT NULL,
    PRIMARY KEY(user_id, friend_id) 
);

CREATE TABLE stories(
    story_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES users(user_id),
    title varchar(255) NOT NULL,
    body varchar NOT NULL,
    publish_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    likes INTEGER DEFAULT 0
);

CREATE TABLE likes(
    story_id uuid NOT NULL,
    user_id uuid NOT NULL,
    PRIMARY KEY(story_id, user_id)
);