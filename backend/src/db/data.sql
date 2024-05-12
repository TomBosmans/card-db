--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: kysely_migration; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.kysely_migration (name, "timestamp") FROM stdin;
20240510T145024-create-table-users	2024-05-10T19:53:59.487Z
20240510T151923-create-type-collection-enum	2024-05-10T19:53:59.489Z
20240510T151927-create-table-cards	2024-05-10T19:53:59.491Z
20240510T180017-create-table-decks	2024-05-10T19:53:59.494Z
\.


--
-- Data for Name: kysely_migration_lock; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.kysely_migration_lock (id, is_locked) FROM stdin;
migration_lock	0
\.


--
-- PostgreSQL database dump complete
--

