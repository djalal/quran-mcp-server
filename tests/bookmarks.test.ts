import { BookmarksService } from '../src/services/bookmarks-service';
import { makeRequest } from '../src/services/base-service';
import { handleAddBookmark } from '../src/handlers/bookmarks';

jest.mock('../src/services/base-service', () => ({
  makeRequest: jest.fn(),
}));

const mockedMakeRequest = makeRequest as jest.MockedFunction<typeof makeRequest>;

describe('BookmarksService', () => {
  const service = new BookmarksService();
  beforeEach(() => {
    mockedMakeRequest.mockReset();
    mockedMakeRequest.mockResolvedValue({ ok: true });
  });

  it('calls makeRequest when adding bookmark', async () => {
    await service.addBookmark({ verse_key: '1:1' });
    expect(mockedMakeRequest).toHaveBeenCalledWith('POST', expect.any(String), {}, { verse_key: '1:1' });
  });
});

describe('Bookmark handlers', () => {
  it('returns error on validation failure', async () => {
    const result = await handleAddBookmark({});
    expect(result.isError).toBe(true);
  });
});
