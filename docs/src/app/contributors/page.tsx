import { PageHeader } from "@/app/components/PageHeader";
import { Section } from "@/app/components/Section";
import { Github, Heart, Code2, MessageSquare, Lightbulb, Palette } from "lucide-react";

export default function ContributorsPage() {
  const contributionWays = [
    {
      icon: Code2,
      title: "Code",
      description: "Fix bugs, improve performance, add new components, or enhance existing ones."
    },
    {
      icon: MessageSquare,
      title: "Documentation",
      description: "Improve docs, write examples, create tutorials, or clarify usage."
    },
    {
      icon: Lightbulb,
      title: "Ideas",
      description: "Suggest new components, features, or improvements via discussions."
    },
    {
      icon: Code2,
      title: "Tests",
      description: "Write unit tests, integration tests, or improve test coverage."
    },
    {
      icon: MessageSquare,
      title: "Feedback",
      description: "Try the library, report issues, or share your experience."
    },
    {
      icon: Palette,
      title: "Design",
      description: "Help improve the visual design and user experience."
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Fork the repository",
      description: "Click the fork button on GitHub to create your own copy of the project."
    },
    {
      number: "2",
      title: "Clone your fork",
      description: "Clone your fork locally: git clone https://github.com/YOUR_USERNAME/d3-ui.git"
    },
    {
      number: "3",
      title: "Create a branch",
      description: "Create a new branch for your feature: git checkout -b feature/your-feature"
    },
    {
      number: "4",
      title: "Make changes",
      description: "Make your changes and commit them with clear, descriptive messages."
    },
    {
      number: "5",
      title: "Push your branch",
      description: "Push your changes to your fork: git push origin feature/your-feature"
    },
    {
      number: "6",
      title: "Open a Pull Request",
      description: "Go to the original repo and click 'New Pull Request' to describe your changes."
    },
  ];

  return (
    <div className="py-12 space-y-16">
      <PageHeader 
        title="Contributors"
        subtitle="Help make d3-ui better! We welcome all contributions, no matter how big or small."
      />

      <Section title="Ways to Contribute">
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Whether you're a developer, designer, writer, or simply a passionate user, there are many ways you can help:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contributionWays.map((way, idx) => {
            const Icon = way.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <Icon className="w-8 h-8 text-sky-600 dark:text-sky-400 mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  {way.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {way.description}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Getting Started">
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Follow these steps to get started contributing to d3-ui:
        </p>
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="flex gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-sky-600 dark:bg-sky-500 text-white flex items-center justify-center font-semibold text-sm">
                  {step.number}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Development Setup">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Prerequisites</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
              <li>Node.js 16+ and npm or yarn</li>
              <li>Git</li>
              <li>A code editor (VS Code recommended)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Installation</h3>
            <div className="bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto">
              <pre className="font-mono text-sm">
{`# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build`}
              </pre>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Code Guidelines">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Coding Standards</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
              <li>Follow the existing code style and conventions</li>
              <li>Use TypeScript for type safety</li>
              <li>Write clear, descriptive variable and function names</li>
              <li>Add comments for complex logic</li>
              <li>Write tests for new features</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Commit Messages</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-3">
              Write clear, descriptive commit messages that explain what changes you made and why:
            </p>
            <div className="bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 rounded-lg">
              <pre className="font-mono text-sm">
{`# Good
feat: Add useD3Transition hook for smooth animations
fix: Handle edge case in ScatterPlot data mapping
docs: Improve BarChart examples and documentation

# Avoid
updated files
fix stuff
changes`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Pull Requests</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
              <li>Provide a clear description of what your PR does</li>
              <li>Link to any related issues using #issue-number</li>
              <li>Include before/after screenshots for UI changes</li>
              <li>Make sure all tests pass</li>
              <li>Keep PRs focused on a single feature or fix</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Report Issues">
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Found a bug? Have a feature request? We'd love to hear about it! Please open an issue on GitHub.
        </p>
        <a
          href="https://github.com/ofirelarat/d3-ui/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-colors"
        >
          <Github className="w-5 h-5" />
          Open an Issue
        </a>
      </Section>

      <Section title="Community & Support">
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Join our community to discuss ideas, ask questions, and connect with other contributors:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://github.com/ofirelarat/d3-ui/discussions"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors group"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              Discussions
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Ask questions, share ideas, and discuss with the community
            </p>
          </a>
          <a
            href="https://github.com/ofirelarat/d3-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors group"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
              GitHub Repository
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              View the source code, create issues, and submit pull requests
            </p>
          </a>
        </div>
      </Section>

      <Section title="Thank You!">
        <div className="p-6 rounded-lg bg-gradient-to-r from-sky-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border border-sky-200 dark:border-slate-700">
          <div className="flex gap-3 mb-4">
            <Heart className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                A huge thanks to everyone who contributes!
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Whether it's code, documentation, feedback, or design—your contributions help make d3-ui better for everyone. 
                We appreciate your time and effort!
              </p>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
