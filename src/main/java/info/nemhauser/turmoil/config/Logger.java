package info.nemhauser.turmoil.config;

public class Logger
{
	public static void log(String string)
	{
		System.out.println(
			"[" + getCallerClassName() + "] " +
			string
		);
	}

	private static String getCallerClassName()
	{
		return new StacktraceSecurityManager().getCallerClassName(3);
	}
}
