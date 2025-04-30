package db

type Repository interface {
	Ping() error
	Close() error
}

type UsersRepository interface {
	Repository
	CreateUser(user *User) error
	GetUserById(id int) (*User, error)
}

type EventsRepository interface {
	Repository
	CreateEvent(event *Event) error
	GetEventByID(id int) (*Event, error)
}

type User struct {
	ID      int
	Mail    string
	Name    string
	IsAdmin bool
}

type Event struct {
	ID           int
	IvcID        int
	Name         string
	Description  string
	DateStart    string
	DateEnd      string
	TypeOC       bool
	PlaceAddress string
	UserCreater  int
}
