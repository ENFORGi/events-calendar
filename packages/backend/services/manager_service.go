package services

import (
	"backend/repositories"

	"gorm.io/gorm"
)

type ServiceManager struct {
	User              *UserService
	Event             *EventService
	Ivc               *IvcService
	Mediafileforevent *MediaFileEventsService
	Mediafile         *MediaFileService
	Usersevent        *UserEventsService
	Typeevent         *TypeEventService
	Subtypeevent      *SubTypeEventService
}

func NewServiceManager(db *gorm.DB) *ServiceManager {
	userRepo := repositories.NewUserRepository(db)
	userService := NewUserService(userRepo)

	eventRepo := repositories.NewEventsRepositoriy(db)
	eventService := NewEventService(eventRepo)

	ivcRepo := repositories.NewIvcRepositoriy(db)
	ivcService := NewIvcService(ivcRepo)

	mediaFileForEventRepo := repositories.NewMediaFileEventsRepositoriy(db)
	mediaFileForEventService := NewMediaFileEventsService(mediaFileForEventRepo)

	mediaFileRepo := repositories.NewMediaFileRepositoriy(db)
	mediaFileService := NewMediaFileService(mediaFileRepo)

	usersEventRepo := repositories.NewUserEventsRepositoriy(db)
	usersEventService := NewUserEventsService(usersEventRepo)

	typeEventRepo := repositories.NewTypeEventsRepositoriy(db)
	typeEventService := NewTypeEventService(typeEventRepo)

	subTypeEventRepo := repositories.NewSubTypeEventsRepositoriy(db)
	subTypeEventService := NewSubTypeEventService(subTypeEventRepo)

	return &ServiceManager{
		User:              userService,
		Event:             eventService,
		Ivc:               ivcService,
		Mediafileforevent: mediaFileForEventService,
		Mediafile:         mediaFileService,
		Usersevent:        usersEventService,
		Typeevent:         typeEventService,
		Subtypeevent:      subTypeEventService,
	}
}
