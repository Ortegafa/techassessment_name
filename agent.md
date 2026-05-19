1. Tools Used

During this project, I used several AI-assisted development tools to support the implementation of the backend application.

The main tool I used was ChatGPT. I used it to generate boilerplate code, explain programming concepts, debug errors, and improve architectural decisions. It was especially useful when working with NestJS, Prisma, Docker, PostgreSQL, and TypeScript configuration issues.

I also used GitHub Copilot for code autocompletion and generating repetitive code structures such as DTOs, interfaces, and service methods.

Additionally, I consulted the official Prisma Documentation to validate schema configurations, migrations, and database connections, as well as the NestJS Documentation to confirm dependency injection patterns and best practices.

2. Your Approach

I began the project by defining the overall architecture manually using clean architecture principles. Instead of asking AI to generate the entire project at once, I divided the work into smaller and more manageable tasks.

First, I designed the folder structure and separated the application into domain, application, and infrastructure layers. Then, I used AI to help implement specific components such as repositories, use cases, DTOs, Prisma models, and Docker configuration.

AI was also heavily used for debugging issues related to Prisma migrations, PostgreSQL authentication, Docker container configuration, and TypeScript compiler errors.

Throughout the process, I iterated on prompts multiple times whenever the generated code did not fully match my project requirements or coding style. I reviewed and modified almost every AI-generated solution before integrating it into the final project.

Overall, AI functioned as a development assistant rather than a complete replacement for manual programming decisions.

3. Key Prompts
Prompt 1

What I asked the AI to do:
“Create a DeleteUserUseCase in NestJS using clean architecture and Prisma repository pattern.”

What the AI generated:
The AI generated a use case class that used dependency injection, repository abstraction, and validation to check whether the user existed before deleting it.

How I used it:
I modified the generated code by replacing generic JavaScript errors with NestJS NotFoundException and adapting the implementation to my repository interface.

Prompt 2

What I asked the AI to do:
“Help me fix Prisma migration and PostgreSQL Docker connection issues.”

What the AI generated:
The AI explained how to configure the .env file correctly, match Docker credentials with Prisma datasource URLs, and rebuild Docker containers.

How I used it:
I used most of the generated solution directly, but I still verified the configuration manually using Docker commands and Prisma CLI tools.

Prompt 3

What I asked the AI to do:
“Explain what Promise type should be returned in a repository delete method.”

What the AI generated:
The AI explained the differences between Promise<void>, Promise<User>, and Promise<boolean> for delete operations.

How I used it:
I used the explanation to redesign my repository interface and selected Promise<void> because my architecture did not require returning the deleted entity.

4. Critical Evaluation

One significant AI-generated component was the DeleteUserUseCase.

The AI correctly implemented dependency injection in NestJS, used asynchronous operations properly, and followed the repository abstraction pattern required by clean architecture. It also included validation before attempting to delete a user.

However, I improved several aspects of the generated code. I replaced generic JavaScript Error objects with NestJS-specific exceptions such as NotFoundException, removed unused imports, and adjusted method return types to better align with the project architecture.

To verify that the code worked correctly, I tested the endpoint manually using HTTP requests and confirmed the database changes directly in PostgreSQL. I also rebuilt the application inside Docker containers to ensure compatibility and correct behavior in the containerized environment.

The AI occasionally introduced issues such as incompatible Prisma configurations, redundant return await statements, and TypeScript configuration problems related to version differences. These problems required manual correction and validation using official documentation.

5. What You Learned

During this project, I learned several concepts and techniques that I did not fully understand before starting.

I gained a deeper understanding of clean architecture in NestJS, especially how to separate the domain, application, and infrastructure layers. I also learned how repository patterns improve maintainability and reduce coupling between components.

Additionally, I learned how Prisma migrations and schema generation work, how Docker networking affects PostgreSQL connections, and how dependency injection functions internally in NestJS.

I also improved my understanding of TypeScript configuration, asynchronous programming with Promises, and proper exception handling using framework-specific exceptions.

Most importantly, I learned how to critically evaluate AI-generated code instead of accepting it blindly. I became more comfortable validating configurations, testing implementations, and identifying potential issues introduced by AI suggestions.