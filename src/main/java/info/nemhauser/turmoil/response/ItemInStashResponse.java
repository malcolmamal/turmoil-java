package info.nemhauser.turmoil.response;

public class ItemInStashResponse
{
	private String ident;
	private String fileCode;
	private String filePath;
	private String rarity;

	public ItemInStashResponse(String ident, String fileCode, String filePath, String rarity)
	{
		this.ident = ident;
		this.fileCode = fileCode;
		this.filePath = filePath;
		this.rarity = rarity;
	}

	public String getIdent()
	{
		return ident;
	}

	public String getFileCode()
	{
		return fileCode;
	}

	public String getFilePath()
	{
		return filePath;
	}

	public String getRarity()
	{
		return rarity;
	}
}
