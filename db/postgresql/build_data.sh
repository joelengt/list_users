
# create database
psql -h localhost -p 5432 -U postgres usuarios < ./db/postgresql/init/create_db.sql

# create tables
psql -h localhost -p 5432 -U postgres usuarios < ./db/postgresql/init/create_tables.sql

#inserta content
psql -h localhost -p 5432 -U postgres usuarios < ./db/postgresql/import_data/data.sql
