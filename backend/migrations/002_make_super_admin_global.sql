ALTER TABLE users
    DROP INDEX uq_users_center_email;

ALTER TABLE users
    ADD UNIQUE KEY uq_users_center_email (center_id, email);
