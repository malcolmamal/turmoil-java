package info.nemhauser.turmoil.response;

import info.nemhauser.turmoil.engine.domain.Item;

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

	public ItemInStashResponse(Item item)
	{
		this.ident = item.getIdent();
		this.fileCode = item.getFileCode();
		this.filePath = item.getFullImagePath();
		this.rarity = item.getRarityClass();
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
