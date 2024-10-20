set names 'utf8';

create table "todo_user"
(
    "id"              serial primary key,
    "created_at"      timestamptz  not null,
    "updated_at"      timestamptz  not null,
    "username"        varchar(255) not null,
    "name"            varchar(255) not null,
    "hashed_password" varchar(255) not null
);
alter table "todo_user"
    add constraint "todo_user_username_unique" unique ("username");

create table "todolist"
(
    "id"           serial primary key,
    "created_at"   timestamptz  not null,
    "updated_at"   timestamptz  not null,
    "name"         varchar(255) not null,
    "details"      varchar(255) not null,
    "is_completed" boolean      not null default false,
    "creator_id"   int          not null
);

create table "todolist_item"
(
    "id"           serial primary key,
    "created_at"   timestamptz  not null,
    "updated_at"   timestamptz  not null,
    "name"         varchar(255) not null,
    "details"      varchar(255) null,
    "is_completed" boolean      not null default false,
    "todolist_id"  int          not null,
    "creator_id"   int          not null
);

create table "shared_list"
(
    "id"           serial primary key,
    "created_at"   timestamptz not null,
    "updated_at"   timestamptz not null,
    "todolist_id"  int         not null,
    "shared_to_id" int         not null,
    "active"       boolean     not null default true
);
alter table "shared_list"
    add constraint "shared_list_todolist_id_shared_to_id_unique" unique ("todolist_id", "shared_to_id");

alter table "todolist"
    add constraint "todolist_creator_id_foreign" foreign key ("creator_id") references "todo_user" ("id") on update cascade;

alter table "todolist_item"
    add constraint "todolist_item_todolist_id_foreign" foreign key ("todolist_id") references "todolist" ("id") on update cascade;
alter table "todolist_item"
    add constraint "todolist_item_creator_id_foreign" foreign key ("creator_id") references "todo_user" ("id") on update cascade;

alter table "shared_list"
    add constraint "shared_list_todolist_id_foreign" foreign key ("todolist_id") references "todolist" ("id") on update cascade;
alter table "shared_list"
    add constraint "shared_list_shared_to_id_foreign" foreign key ("shared_to_id") references "todo_user" ("id") on update cascade;

