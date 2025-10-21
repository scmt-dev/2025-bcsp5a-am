create table activities (
    id serial primary key,
    type varchar(255) not null, -- Expense or Income
    category varchar(255) not null,
    description text null,
    amount decimal(16,2) not null,
    created_at timestamp default now(),
    updated_at timestamp default now(),
    user_id uuid null references auth.users(id)
);

-- index
create index activities_user_id_idx on activities(user_id);
