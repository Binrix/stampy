CREATE USER jarvis WITH PASSWORD 'CHANGEME';
CREATE DATABASE gdd;
GRANT ALL PRIVILEGES ON DATABASE gdd TO jarvis;
SET timezone TO 'Europe/Zurich';


USE gdd;
CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL
);

CREATE TABLE working_block (
    id SERIAL PRIMARY KEY,
    projectid INT NOT NULL,
    starttime TIMESTAMP NOT NULL,
    endtime TIMESTAMP,
    workingtime NUMERIC,
    CONSTRAINT fk_project FOREIGN KEY(Project_Id) REFERENCES project(id)
); 

