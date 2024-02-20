CREATE DATABASE IF NOT EXISTS roulette;

USE roulette;

DROP TABLE IF EXISTS elements;

CREATE TABLE elements (
                          pl text,
                          en text,
                          categories JSON
);

!-- @todo tidy up categories mess....

INSERT INTO elements VALUES
                         ('blabla1-AB-pl','blabla1-AB-en', '["category1", "category2"]'),
                         ('blabla2-A-pl','blabla2-A-en', '["category1"]'),
                         ('blabla3-B-pl','blabla3-B-en', '["category2"]'),
                         ('blabla4-C-pl','blabla4-C-en', '["category3"]');