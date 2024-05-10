# Datastructure

## users

| column     | type      |
| ---------- | --------- |
| id         | uuid      |
| first_name | varchar   |
| last_name  | varchar   |
| email      | varchar   |
| password   | varchar   |
| created_at | timestamp |
| updated_at | timestamp |

## cards

| column     | type      | description                     |
| ---------- | --------- | ------------------------------- |
| id         | uuid      |                                 |
| name       | varchar   |                                 |
| game       | game_enum | ex: ashes_reborn, fab, mtg, ... |
| meta       | jsonb     |                                 |
| image_url  | varchar   |                                 |
| created_at | timestamp |                                 |
| updated_at | timestamp |                                 |

## decks

| column     | type      | description                     |
| ---------- | --------- | ------------------------------- |
| id         | uuid      |                                 |
| user_id    | uuid      |                                 |
| card_ids   | uuid[]    |                                 |
| game       | game_enum | ex: ashes_reborn, fab, mtg, ... |
| name       | varchar   |                                 |
| meta       | jsonb     |                                 |
| created_at | timestamp |                                 |
| updated_at | timestamp |                                 |
