# Injecting Dependencies

Like components, services often require dependencies that Angular injects through the constructor of the service's class. Since we are initializing these classes outside the bootstrapping process of Angular, we must explicitly inject these dependencies ourselves. This is accomplished by calling beforeEachProvider to feed in required dependencies like the HTTP module.
