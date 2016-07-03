create extension if not exists pgcrypto;

drop table if exists Contacts cascade;
create table Contacts (
    Id              uuid constraint PK_Contacts_Id primary key default gen_random_uuid(),
    FirstName       text,
    LastName        text,
    Email       text not null,
    CompanyName text,
    Address1            text,
    Address2            text,
    Zip         varchar(10),
    State       text,
    Country     text,
    DateCreated     timestamp not null,
    DateModified    timestamp default current_timestamp
);

drop table if exists Organizations cascade;
create table Organizations (
    Id              uuid constraint PK_Organizations_Id primary key default gen_random_uuid(),
    OwnerUserId     uuid,
    Name        text not null,
    Description text,
    IsActive        boolean,
    DateCreated     timestamp not null,
    DateModified    timestamp default current_timestamp
);

drop table if exists Users cascade;
create table Users (
    id              uuid constraint PK_Users_Id primary key default gen_random_uuid(),
    email           text not null,
    password        text null,
    organizationId      uuid not null constraint FK_Users_OrganizationId_Organization_Id references Organizations(Id),
    isActive            boolean,
    contactId           uuid constraint FK_Users_ContactId_Contacts_Id references Contacts(Id),
    --ApiKey            text not null,
    passwordResetKey    text null,
    passwordResetKeyExpiryDate timestamp null,
    createdAt           timestamp not null,
    updatedAt           timestamp default current_timestamp,
    verified        boolean default false
);

create unique index IU_Users_Email on Users (Email);
--create unique index IU_Users_ApiKey on Users (ApiKey);

alter table Organizations add constraint FK_Organizations_OwnerUserId_Users_Id foreign key (OwnerUserId) references Users(Id);

drop table if exists Roles cascade;
create table Roles (
    Id      serial constraint PK_Roles_Id primary key,
    Name    text not null,
    Description text
);

insert into Roles (Name)
values  ('Admin'),
        ('Team Member');
